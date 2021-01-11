const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const { format } = require('@fast-csv/format');
const path = require("path");
const url = require("url");
const fs = require("fs");
const csv = require('@fast-csv/parse');
const SerialPort = require("serialport");
const ByteLength = require('@serialport/parser-byte-length')
const Moment = require('moment');
const Axios = require('axios');
const Exec = require('child_process').exec;
const nodemailer = require("nodemailer");
const config = require('./configs').conf;
const Logo = '../assets/LogoCristofoli.ico';

let port = null;
let parser = null
let howRequestWindow = "";
let mainWindow;
const regex = new RegExp("[0-9][0-9]:[0-9][0-9]:[0-9][0-9]", "g");

function createWindow() {
    mainWindow = new BrowserWindow({
        Width: 1366,
        Height: 768,
        minWidth: 750,
        minHeight: 450,
        center: true,
        useContentSize: true,
        icon: Logo,
        webPreferences: {
            devTools: false,
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
    mainWindow.removeMenu();

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '..', 'front/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('closed', function () {
        mainWindow = null
    });
};


const handleTime = (seconds) =>{
    const time = new Date(null);
    time.setSeconds(seconds);
    return time.toISOString().substr(11, 8);
};

const handleFileName = (date) => {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} - ${date.getHours()}_${date.getMinutes() < 10 ? '0'.concat(date.getMinutes()) : date.getMinutes()}`;
};

// função responsavel por manipular os dados recebidos e envia-los ao front-end
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
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.on('Exit', (event) => {
    port.close();
    event.reply("changeWindow", true);
});

//função responsavel por avisar o usuário que um teste está em curso
ipcMain.on("openModal", async (event, argument) => {
    howRequestWindow = argument;
    const option = await dialog.showMessageBox(mainWindow, {
        title: "Cristófoli Biossegurança",
        icon: Logo,
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

// função responsavel por avisar ao usuário que os modelos de autoclave não são compatives para comparação
ipcMain.on('modelErro', (event, argument) => {
    dialog.showMessageBoxSync(mainWindow, {
        title: "Cristófoli Biossegurança",
        icon: Logo,
        message: "Não é possivel comparar dados de modelos diferentes!",
        buttons: ['Ok'],
        cancelId:0,
        defaultId:0,
        type:'error'
    });
});

// função responsavel por listar todas as portas seriais no sistema
ipcMain.on("listPorts", (event) => {
    SerialPort.list().then(function (data) {
        const ports = data.map((port) => {
            return port.path;
        });
        event.reply("listPort", ports);
    });
});

// função responsavel pela conexão com a porta serial
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

// função responsavel pelo envio do e-mail
ipcMain.on('Report', async (event, argument) => {
    let anexos = [];

    const transporter = nodemailer.createTransport({
        host: config.serverMail,
        port: 587,
        secure: false,
        auth: {
          user: config.email,
          pass: config.password,
        },
    });

    if(argument.file){
        argument.file.forEach((path) => {
            anexos.push({
                path: path
            })
        });
    }

    transporter.sendMail({
        from: config.email,
        to: config.email,
        subject: "Report de autoclave",
        html: `<b>Técnico:</b> ${argument.name}<br /><b>Código da assistência:</b> ${argument.code}<br /><b>Modelo da autoclave:</b> ${argument.model}<br /><b>Número de série:</b> ${argument.serie}<br /><b>Versão do software:</b> ${config.version}<br /><b>Sistema Operacional: </b>${process.platform}<b> - </b>${process.getSystemVersion()}<b> - </b>${process.arch}<br /><b>Ciclo Realizado:</b> ${argument.cycle}<br /><br /><b>Descrição:</b> ${argument.description}`,
        attachments: anexos,
    }, (err, info) => {
        if(err){
            dialog.showMessageBoxSync(mainWindow, {
                title: "Cristófoli Autoclave Manager - Reportar",
                icon: Logo,
                message: "A mensagem Não foi Enviada, Por Favor Tente Novamente",
                buttons: ['Ok'],
                type:'error'
            });
        }
        if(info){
            dialog.showMessageBoxSync(mainWindow, {
                title: "Cristófoli Autoclave Manager - Reportar",
                icon: Logo,
                message: "O Reporte foi Enviado, Agradecemos o contato",
                buttons:['Ok'],
                type:'warning'
            });
        }
        event.reply("report", true);
    });
});

// função responsavel pela atualização do software
ipcMain.on('Update', async (event, argument) => {
    Axios({
        url: config.url,
        method: 'GET',
        responseType: 'json',
        timeout: 4000,
    }).then(async (response) => {
        if(response.data[`${process.platform}`][`${process.arch}`].currentVersion > config.version){
            const option = dialog.showMessageBoxSync(mainWindow, {
                title: "Cristófoli Biossegurança - Atualização",
                icon: Logo,
                message: "Uma nova versão está disponivel, deseja fazer o download e instalar?",
                buttons: ['Não', 'Sim'],
                cancelId:0,
                defaultId:0,
                type:'warning'
            });
            if(option){
                const path = dialog.showSaveDialogSync(mainWindow, {
                    title: "Cristófoli Biossegurança - Salvar nova versão",
                    icon: Logo,
                    defaultPath: response.data[`${process.platform}`][`${process.arch}`].name,
                    filters: [{
                        name: '.exe', extensions: ['exe']
                    }]
                });
                if(path){
                    dialog.showMessageBoxSync(mainWindow, {
                        title: "Cristófoli Biossegurança - Atualização",
                        icon: Logo,
                        message: "Durante o processo você será perguntado se deseja fechar a janela, por favor clique em 'ok'",
                        buttons:['Prosseguir'],
                        type:'warning'
                    });
                    const { data, headers } = await Axios({
                        url: response.data[`${process.platform}`][`${process.arch}`].address,
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
                    mainWindow.webContents.send("progress", false);
                }
            }
            else{
                mainWindow.webContents.send("progress",false);
            }
        }
    }).catch((err) => {
        mainWindow.webContents.send("progress", false);
    });
});

// função responsavel por salvar o arquivo csv
ipcMain.on("saveCSV", (event, argument) => {
    const date = new Date(null);
    date.setMilliseconds(Date.now());
    const path = dialog.showSaveDialogSync(mainWindow, {
        title: "Cristófoli Biossegurança - Salvar dados do teste",
        icon: Logo,
        defaultPath: `${handleFileName(Moment().toDate())}${process.platform == 'linux' ? '.csv' : ''}`,
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
            event.reply("C", true);
        });
    }
    else{
        event.reply("C", false);
    }
});

//função responsavel por ler os dados dos arquivos csv salvos anteriormente
ipcMain.on("loadCSV", async (event, argument) => {
    const path = dialog.showOpenDialogSync(mainWindow, {
        title: "Cristófoli Biossegurança - Carregar dados",
        icon: Logo,
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
});

