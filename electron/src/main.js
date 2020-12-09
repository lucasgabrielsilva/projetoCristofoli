const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");
const csv = require('@fast-csv/parse');
const { format } = require('@fast-csv/format');
const SerialPort = require("serialport");
const ByteLength = require('@serialport/parser-byte-length')
const Moment = require('moment');
const Axios = require('axios');
///const PromiseFtp = require('promise-ftp');
const Exec = require('child_process').exec;
const Version = require('./configs').version;
///const ftp = require('basic-ftp');


let paf = null;
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
            allowRunningInsecureContent: false,
            webSecurity: true,
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            worldSafeExecuteJavaScript: true,
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

    /*
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
            allowRunningInsecureContent: false,
            webSecurity: true,
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            worldSafeExecuteJavaScript: true,
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
    */
}


const handleTime = (seconds) =>{
    const time = new Date(null);
    time.setSeconds(seconds);
    return time.toISOString().substr(11, 8);
}

const handleFileName = (date) => {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} - ${date.getHours()}_${date.getMinutes() < 10 ? '0'.concat(date.getMinutes()) : date.getMinutes()}`;
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
    event.reply("B", false);
});

ipcMain.on("openModal", async (event, argument) => {
    howRequestWindow = argument;
    const option = await dialog.showMessageBox(mainWindow, {
        title: "Cristófoli Biossegurança",
        message: "Um teste está sendo realizado, caso você saia agora todo o progresso será perdido!\nCaso queira salvar o resultado parcial do teste: clique em 'Não' e em seguida em 'Parar'.",
        buttons: ['Não', 'Sim'],
        cancelId:0,
        defaultId:0,
        type:'warning'
    });
    if(option.response){
        if(howRequestWindow == "/"){
            port.close();
        }
        howRequestWindow = "";
        mainWindow.webContents.send("changeWindow", true);
    }
    else{
        mainWindow.webContents.send("changeWindow", false);
    }
});

ipcMain.on("redirect", (event, argument) => {
    if(argument){
        if(howRequestWindow == "/"){
            port.close();
        }
        howRequestWindow = "";
        ///child.hide();
        mainWindow.webContents.send("changeWindow", true);
    }
    else{
        howRequestWindow = "";
        ///child.hide();
        mainWindow.webContents.send("changeWindow", false);
    }
})

ipcMain.on('modelErro', (event, argument) => {
    dialog.showMessageBoxSync(mainWindow, {
        title: "Cristófoli Biossegurança",
        message: "Não é possivel compara dados de modelos diferentes!",
        buttons: ['Ok'],
        cancelId:0,
        defaultId:0,
        type:'error'
    });

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
        event.reply("connectionPort", false);
    });
});

ipcMain.on('Update', async (event, argument) => {

    Axios({
        url: 'https://www.cristofoli.com/apps/AT/SW/version.json',
        method: 'GET',
        responseType: 'json',
        timeout: 4000,
    }).then(async (response) => {
        if(response.data.win.x64.currentVersion > Version){
            const option = dialog.showMessageBoxSync(mainWindow, {
                title: "Cristófoli Biossegurança - Atualização",
                message: "Uma nova versão está disponivel, deseja fazer o download e instalar?",
                buttons: ['Não', 'Sim'],
                cancelId:0,
                defaultId:0,
                type:'warning'
            });
            if(option){
                const path = dialog.showSaveDialogSync(mainWindow, {
                    title: "Cristófoli Biossegurança - Salvar nova versão",
                    defaultPath: response.data.win.x64.name,
                    filters: [{
                        name: '.exe', extensions: ['exe']
                    }]
                });
                if(path){
                    dialog.showMessageBoxSync(mainWindow, {
                        title: "Cristófoli Biossegurança - Atualização",
                        message: "Durante o processo você será perguntado se deseja fechar a janela, por favor clique em 'ok'",
                        buttons:['Prosseguir'],
                        type:'warning'
                    });
                    const { data, headers } = await Axios({
                        url: response.data.win.x64.address,
                        method: "GET",
                        responseType: "stream",
                    });
                    let receive = 0;
                    data.on('data', (data) => {
                        receive += data.length;
                        mainWindow.webContents.send("progress",`Download: ${parseInt((receive * 100) / headers['content-length'])}%`)
                    });
                    data.on('end', () => {
                        mainWindow.webContents.send("progress",`Iniciando instalação...`);
                        setTimeout(() => {
                            Exec(`start ${path}`, (err, res) => {
                                mainWindow.webContents.send("status", err)
                                mainWindow.webContents.send("status", res)
                            });
                        },5000);
                    });
                    data.pipe(fs.createWriteStream(path));
                }
                else{
                    mainWindow.webContents.send("progress",'end');
                }
            }
            else{
                mainWindow.webContents.send("progress",'end');
            }
        }
    }).catch((err) => {
        mainWindow.webContents.send("progress",'end');
        console.log(err)
    });
});

ipcMain.on("saveCSV", (event, argument) => {

    const date = new Date(null);
    date.setMilliseconds(Date.now());
    const path = dialog.showSaveDialogSync(mainWindow, {
        title: "Cristófoli Biossegurança - Salvar dados do teste",
        defaultPath: handleFileName(Moment().toDate()),
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
        let temp = [];
        let data = {};
        csv.parseFile(path[0])
        .on('error', error => console.error(error))
        .on('data', (row) => {
            temp.push(row[0].split("\t"));
        }).on('end', () => {
            temp[0].map((element, index) => {
                data[element] = temp.map((value, subIndex) => {
                    if(subIndex != 0){
                        return value[index];
                    }
                })
            });
            Object.keys(data).forEach((element) => {
                data[element].shift();
            });
            data.label = path[0];
            event.reply("dataCSV", data);
        });
    }
    else{
        event.reply("C", false);
    }
})

const handleParser = () => {
    parser = port.pipe(new ByteLength({length: 13}))
    parser.on("data", (values) => {
        const valuesInt = new Uint8Array(values)
        if((values[0] == 0x55) && (values[1] == 0x66) && (values[2] == 0xAA) && (values[3] == 0xBB) && (values[12] == 0x0A)){
            const values16 = new Uint16Array([
                ((valuesInt[4] << 8) + valuesInt[5]),
                ((valuesInt[6] << 8) + valuesInt[7]),
                ((valuesInt[8] << 8) + valuesInt[9]),
                ((valuesInt[10] << 8) + valuesInt[11]),
            ]);
            const data = {
                'timeStamp': Date.now(),
                'Tensão(V)': (values16[0] / 10),
                'Resistência(ºC)': (values16[1] / 10),
                'Vaso de Pressão(ºC)': (values16[2] / 10),
                'Pressão(Kgf/cm²)': (values16[3] / 100)
            }
            mainWindow.webContents.send("A", data);
        }
        else if(values[0] == 0x0A){
            const values16 = new Uint16Array([
                ((valuesInt[1] << 8) + valuesInt[2]),
                ((valuesInt[3] << 8) + valuesInt[4]),
                ((valuesInt[5] << 8) + valuesInt[6]),
                ((valuesInt[7] << 8) + valuesInt[8]),
                ((valuesInt[9] << 8) + valuesInt[10]),
                ((valuesInt[11] << 8) + valuesInt[12]),
            ]);
            const data = [handleTime(values16[0]),
            handleTime(values16[1]),
            handleTime(values16[2]),
            handleTime(values16[3]),
            handleTime(values16[4]),
            handleTime(values16[5]),]
            mainWindow.webContents.send("B",data);
        }
    });
}

