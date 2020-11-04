const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");
const csv = require('@fast-csv/parse');
const { format } = require('@fast-csv/format');
const SerialPort = require("serialport");
const ByteLength = require('@serialport/parser-byte-length')

let port = null;
let parser = null
let howRequestWindow = "";
let mainWindow;
const regex = new RegExp("[0-9][0-9]:[0-9][0-9]:[0-9][0-9]", "g");

let child;


function createWindow() {
    mainWindow = new BrowserWindow({
        Width: 1366, 
        Height: 768,
        minWidth: 750, 
        minHeight: 450,
        center: true,
        useContentSize: true,
        webPreferences: {
            allowRunningInsecureContent: true,
            webSecurity: false,
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, "./preload.js")
          }
    });

    mainWindow.maximize();
    //mainWindow.removeMenu();

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '..', 'build/index.html'),
        protocol: 'file:',
        slashes: true 
    }));

    mainWindow.on('closed', function () {
        mainWindow = null
    })

    child = new BrowserWindow({ parent: mainWindow,
        modal: true,
        minimizable: false,
        maximizable: false,
        closable: false,
        show: false,
        frame: false,
        height: 200,
        width: 600,
        webPreferences: {
            allowRunningInsecureContent: true,
            webSecurity: false,
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, "./preload.js")
        }
    })
    child.loadURL(url.format({
    pathname: path.join(__dirname, './components/modal/index.html'),
    protocol: 'file:',
    slashes: true 
    }));

    child.on('close', function () {
        child.hide();
    })

    child.removeMenu();
}


const handleTime = (seconds) =>{
    const time = new Date(null);
    time.setSeconds(seconds);
    return time.toISOString().substr(11, 8);
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

ipcMain.on('Exit', (event) => {
    port.close();
    event.reply("changeWindow", true);
});

ipcMain.on('teste', (event, argument) => {
    console.log('oi')
    event.reply("B", false);
});

ipcMain.on("openModal", (event, argument) => {
    howRequestWindow = argument;
    child.show();
});

ipcMain.on("redirect", (event, argument) => {
    if(argument){
        if(howRequestWindow == "/"){
            port.close();
        }
        howRequestWindow = "";
        child.hide();
        mainWindow.webContents.send("changeWindow", true);
    }
    else{
        howRequestWindow = "";
        child.hide();
        mainWindow.webContents.send("changeWindow", false);
    }
})

ipcMain.on("listPorts", (event) => {
    SerialPort.list().then(function (data) {
        const ports = data.map((port) => {
            return port.path;
        });
        event.reply("listPort", ports); 
    });
})

ipcMain.on("portConnect", (event, argument) => {
    port = new SerialPort(argument, {
        baudRate: 115200,
        autoOpen: false
    });

    port.open();

    port.on("open", (data) => {
        handleParser();
        event.reply("connectionPort", true);
    });

    port.on("error", (data) => {
        console.log(data)
        event.reply("connectionPort", false);
    });
});

ipcMain.on("saveCSV", (event, argument) => {

    const date = new Date(null);
    date.setMilliseconds(Date.now());
    const path = dialog.showSaveDialogSync(mainWindow, {
        title: "Cristófoli Biossegurança - Salvar dados do teste",
        defaultPath: date.toDateString(),
        filters: [{
            name: '.csv', extensions: ['csv']
        }]
    });
    if(path){
        const ws = fs.createWriteStream(path);
        const stream = format({ headers: true, delimiter: '\t' });
        stream.pipe(ws);
        argument.forEach(element => {
            stream.write(element)
        });
        stream.end();
        stream.on("end", () => {
            event.reply("C", "foi");
        });
    }
    else{
        event.reply("C", false);
    }
})

ipcMain.on("loadCSV", async (event, argument) => {
    const path = dialog.showOpenDialogSync(mainWindow, {
        title: "Cristófoli Biossegurança - Carregar dados",
        properties: ['openFile'],
        filters: [{
            name: '.csv', extensions: ['csv']
        }]
    });
    if(path){
        let data = {
            resistence: [],
            vase: [],
            pressure: [],
            tension: [],
            avgRe: 0,
            maxRe: 0,
            avgVa: 0,
            maxVa: 0,
            avgPe: 0,
            maxPe: 0,
            avgTe: 0,
            maxTe: 0,
            tempPre: undefined,
            tempEst: undefined,
            tempDes: undefined,
            tempSec: undefined,
            tempRes: undefined,
            tempTot: undefined,
            label: path[0].split("\\").pop()
        };
        csv.parseFile(path[0])
        .on('error', error => console.error(error))
        .on('data', (row) => {
            const value = row[0].split("\t");
            data.resistence.push(value[1]);
            data.vase.push(value[2]);
            data.pressure.push(value[3]);
            data.tension.push(value[0]);
            data.avgRe += (parseFloat(value[1]) || 0);
            data.avgVa += (parseFloat(value[2]) || 0);
            data.avgPe += (parseFloat(value[3]) || 0);
            data.avgTe += (parseFloat(value[0]) || 0);
            if((parseFloat(value[1])) > data.maxRe){
                data.maxRe = parseFloat(value[1]);
            }
            if((parseFloat(value[2])) > data.maxVa){
                data.maxVa = parseFloat(value[2]);
            }
            if((parseFloat(value[3])) > data.maxPe){
                data.maxPe = parseFloat(value[3]);
            }
            if((parseFloat(value[0])) > data.maxTe){
                data.maxTe = parseFloat(value[0]);
            }
            if(regex.test(value[4])){
                data.tempPre = value[4];
                data.tempEst = value[5];
                data.tempDes = value[6];
                data.tempSec = value[7];
                data.tempRes = value[8];
                data.tempTot = value[9];
            }
        }).on('end', () => {
            data.resistence.shift();
            data.vase.shift();
            data.pressure.shift();
            data.tension.shift(); 
            data.avgRe = (data.avgRe / data.resistence.length).toFixed(2);
            data.avgVa = (data.avgVa / data.vase.length).toFixed(2);
            data.avgPe = (data.avgPe / data.pressure.length).toFixed(2);
            data.avgTe = (data.avgTe / data.tension.length).toFixed(2);
            event.reply("dataCSV", data);
        });
    }
    else{
        event.reply("C", false);
    }
})

ipcMain.on("reload", (event, argument) => {
    mainWindow.webContents.reload();
})

const handleParser = () => {
    parser = port.pipe(new ByteLength({length: 13}))
    parser.on("data", (values) => {
        const valuesInt = new Uint8Array(values)
        if((values[0] == 0x55) && (values[1] == 0x66) && (values[2] == 0xAA) && (values[3] == 0xBB) && (values[12] == 0x0A)){
            const data = {
                tension: (((valuesInt[4] * 256) + valuesInt[5]) / 100),
                resistence: (((valuesInt[6] * 256) + valuesInt[7]) / 10),
                vase: (((valuesInt[8] * 256) + valuesInt[9]) / 10),
                pressure: (((valuesInt[10] * 256) + valuesInt[11]) / 10)
            }
            mainWindow.webContents.send("A", data);
        }
        else if(values[0] == 0x0A){
            const valuesInt = new Uint8Array(values)
            const data = {
                presurization: handleTime((valuesInt[1] * 256) + valuesInt[2]),
                sterilization: handleTime((valuesInt[3] * 256) + valuesInt[4]),
                depresurization: handleTime((valuesInt[5] * 256) + valuesInt[6]),
                drying: handleTime((valuesInt[7] * 256) + valuesInt[8]),
                coulding: handleTime((valuesInt[9] * 256) + valuesInt[10]),
                total: handleTime((valuesInt[11] * 256) + valuesInt[12])
            }
            mainWindow.webContents.send("B",data);
        }
    });
}