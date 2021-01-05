"use strict";var mainWindow,child,_interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault"),_regenerator=_interopRequireDefault(require("@babel/runtime/regenerator")),_asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator")),_require=require("electron"),app=_require.app,BrowserWindow=_require.BrowserWindow,ipcMain=_require.ipcMain,dialog=_require.dialog,path=require("path"),url=require("url"),fs=require("fs"),csv=require("@fast-csv/parse"),_require2=require("@fast-csv/format"),format=_require2.format,SerialPort=require("serialport"),ByteLength=require("@serialport/parser-byte-length"),Moment=require("moment"),Axios=require("axios"),Exec=require("child_process").exec,nodemailer=require("nodemailer"),config=require("./configs").conf,paf=null,port=null,parser=null,howRequestWindow="",regex=new RegExp("[0-9][0-9]:[0-9][0-9]:[0-9][0-9]","g");function createWindow(){(mainWindow=new BrowserWindow({Width:1366,Height:768,minWidth:750,minHeight:450,center:!0,useContentSize:!0,webPreferences:{devTools:!1,allowRunningInsecureContent:!1,webSecurity:!0,nodeIntegration:!1,contextIsolation:!0,enableRemoteModule:!1,worldSafeExecuteJavaScript:!0,preload:path.join(__dirname,"./preload.js")}})).maximize(),mainWindow.removeMenu(),mainWindow.loadURL(url.format({pathname:path.join(__dirname,"..","front/index.html"),protocol:"file:",slashes:!0})),mainWindow.on("closed",function(){mainWindow=null})}var handleTime=function(e){var n=new Date(null);return n.setSeconds(e),n.toISOString().substr(11,8)},handleFileName=function(e){return"".concat(e.getDate(),"-").concat(e.getMonth()+1,"-").concat(e.getFullYear()," - ").concat(e.getHours(),"_").concat(e.getMinutes()<10?"0".concat(e.getMinutes()):e.getMinutes())};app.on("ready",createWindow),app.on("window-all-closed",function(){"darwin"!==process.platform&&app.quit()}),ipcMain.on("Exit",function(e){port.close(),e.reply("changeWindow",!0)}),ipcMain.on("openModal",function(){var o=(0,_asyncToGenerator2.default)(_regenerator.default.mark(function e(n,o){return _regenerator.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return howRequestWindow=o,e.next=3,dialog.showMessageBox(mainWindow,{title:"Cristófoli Biossegurança",message:"Um teste está sendo realizado, caso você saia agora todo o progresso será perdido!\nCaso queira salvar o resultado parcial do teste: clique em 'Não' e em seguida em 'Parar'.",buttons:["Não","Sim"],cancelId:0,defaultId:0,type:"warning"});case 3:e.sent.response?("/"==howRequestWindow&&port.close(),howRequestWindow="",mainWindow.webContents.send("changeWindow",!0)):mainWindow.webContents.send("changeWindow",!1);case 5:case"end":return e.stop()}},e)}));return function(e,n){return o.apply(this,arguments)}}()),ipcMain.on("redirect",function(e,n){n?("/"==howRequestWindow&&port.close(),howRequestWindow="",mainWindow.webContents.send("changeWindow",!0)):(howRequestWindow="",mainWindow.webContents.send("changeWindow",!1))}),ipcMain.on("modelErro",function(e,n){dialog.showMessageBoxSync(mainWindow,{title:"Cristófoli Biossegurança",message:"Não é possivel compara dados de modelos diferentes!",buttons:["Ok"],cancelId:0,defaultId:0,type:"error"})}),ipcMain.on("listPorts",function(n){SerialPort.list().then(function(e){e=e.map(function(e){return e.path});n.reply("listPort",e)})}),ipcMain.on("portConnect",function(n,e){(port=new SerialPort(e,{baudRate:115200,autoOpen:!1})).open(),port.on("open",function(e){handleParser(),n.reply("connectionPort",!0)}),port.on("error",function(e){console.log(e),n.reply("connectionPort",!1)})}),ipcMain.on("Report",function(){var o=(0,_asyncToGenerator2.default)(_regenerator.default.mark(function e(o,n){var t,r;return _regenerator.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=nodemailer.createTransport({host:config.serverMail,port:587,secure:!1,auth:{user:config.email,pass:config.password}}),r=[],n.file&&n.file.forEach(function(e){r.push({path:e})}),t.sendMail({from:config.email,to:config.email,subject:"Report de autoclave",html:"<b>Técnico:</b> ".concat(n.name,"<br /><b>Código da assistência:</b> ").concat(n.code,"<br /><b>Modelo da autoclave:</b> ").concat(n.model,"<br /><b>Número de série:</b> ").concat(n.serie,"<br /><b>Versão do software:</b> ").concat(config.version,"<br /><b>Sistema Operacional: </b>").concat(process.platform,"<b> - </b>").concat(process.getSystemVersion(),"<b> - </b>").concat(process.arch,"<br /><b>Ciclo Realizado:</b> ").concat(n.cycle,"<br /><br /><b>Descrição:</b> ").concat(n.description),attachments:r},function(e,n){e&&(console.log(config),dialog.showMessageBoxSync(mainWindow,{title:"Cristófoli Autoclave Manager - Reportar",message:"A mensagem Não foi Enviada, Por Favor Tente Novamente",buttons:["Ok"],type:"error"})),n&&dialog.showMessageBoxSync(mainWindow,{title:"Cristófoli Autoclave Manager - Reportar",message:"O Reporte foi Enviado, Agradecemos o contato",buttons:["Ok"],type:"warning"}),o.reply("report",!0)});case 4:case"end":return e.stop()}},e)}));return function(e,n){return o.apply(this,arguments)}}()),ipcMain.on("Update",function(){var o=(0,_asyncToGenerator2.default)(_regenerator.default.mark(function e(n,o){return _regenerator.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:Axios({url:config.url,method:"GET",responseType:"json",timeout:4e3}).then(function(){var n=(0,_asyncToGenerator2.default)(_regenerator.default.mark(function e(n){var o,t,r,a,i;return _regenerator.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(n.data.win.x64.currentVersion>config.version)){e.next=21;break}if(!dialog.showMessageBoxSync(mainWindow,{title:"Cristófoli Biossegurança - Atualização",message:"Uma nova versão está disponivel, deseja fazer o download e instalar?",buttons:["Não","Sim"],cancelId:0,defaultId:0,type:"warning"})){e.next=20;break}if(o=dialog.showSaveDialogSync(mainWindow,{title:"Cristófoli Biossegurança - Salvar nova versão",defaultPath:n.data.win.x64.name,filters:[{name:".exe",extensions:["exe"]}]}))return dialog.showMessageBoxSync(mainWindow,{title:"Cristófoli Biossegurança - Atualização",message:"Durante o processo você será perguntado se deseja fechar a janela, por favor clique em 'ok'",buttons:["Prosseguir"],type:"warning"}),e.next=8,Axios({url:n.data.win.x64.address,method:"GET",responseType:"stream"});e.next=17;break;case 8:t=e.sent,r=t.data,a=t.headers,i=0,r.on("data",function(e){i+=e.length,mainWindow.webContents.send("progress","Download: ".concat(parseInt(100*i/a["content-length"]),"%"))}),r.on("end",function(){mainWindow.webContents.send("progress","Iniciando instalação..."),setTimeout(function(){Exec("start ".concat(o),function(e,n){mainWindow.webContents.send("status",e),mainWindow.webContents.send("status",n)})},5e3)}),r.pipe(fs.createWriteStream(o)),e.next=18;break;case 17:mainWindow.webContents.send("progress",!1);case 18:e.next=21;break;case 20:mainWindow.webContents.send("progress",!1);case 21:case"end":return e.stop()}},e)}));return function(e){return n.apply(this,arguments)}}()).catch(function(e){mainWindow.webContents.send("progress",!1)});case 1:case"end":return e.stop()}},e)}));return function(e,n){return o.apply(this,arguments)}}()),ipcMain.on("saveCSV",function(e,n){new Date(null).setMilliseconds(Date.now());var o,t=dialog.showSaveDialogSync(mainWindow,{title:"Cristófoli Biossegurança - Salvar dados do teste",defaultPath:handleFileName(Moment().toDate()),filters:[{name:".csv",extensions:["csv"]}]});t?(t=fs.createWriteStream(t),(o=format({headers:!0,delimiter:"\t"})).pipe(t),n.forEach(function(e){o.write(e)}),o.end(),o.on("end",function(){e.reply("C","foi")})):e.reply("C",!1)}),ipcMain.on("loadCSV",function(){var o=(0,_asyncToGenerator2.default)(_regenerator.default.mark(function e(n,o){var t,r,a;return _regenerator.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:(t=dialog.showOpenDialogSync(mainWindow,{title:"Cristófoli Biossegurança - Carregar dados",properties:["openFile"],filters:[{name:".csv",extensions:["csv"]}]}))?(r=[],a={},csv.parseFile(t[0]).on("error",function(e){return console.error(e)}).on("data",function(e){r.push(e[0].split("\t"))}).on("end",function(){r[0].map(function(e,o){a[e]=r.map(function(e,n){if(0!=n)return e[o]})}),Object.keys(a).forEach(function(e){a[e].shift()}),a.label=t[0],n.reply("dataCSV",a)})):n.reply("C",!1);case 2:case"end":return e.stop()}},e)}));return function(e,n){return o.apply(this,arguments)}}());var handleParser=function(){(parser=port.pipe(new ByteLength({length:13}))).on("data",function(e){var n,o=new Uint8Array(e);85==e[0]&&102==e[1]&&170==e[2]&&187==e[3]&&10==e[12]?(n=new Uint16Array([(o[4]<<8)+o[5],(o[6]<<8)+o[7],(o[8]<<8)+o[9],(o[10]<<8)+o[11]]),n={timeStamp:Date.now(),"Tensão(V)":n[0]/10,"Resistência(ºC)":n[1]/10,"Vaso de Pressão(ºC)":n[2]/10,"Pressão(Kgf/cm²)":n[3]/100},mainWindow.webContents.send("A",n)):10==e[0]&&(o=new Uint16Array([(o[1]<<8)+o[2],(o[3]<<8)+o[4],(o[5]<<8)+o[6],(o[7]<<8)+o[8],(o[9]<<8)+o[10],(o[11]<<8)+o[12]]),o=[handleTime(o[0]),handleTime(o[1]),handleTime(o[2]),handleTime(o[3]),handleTime(o[4]),handleTime(o[5])],mainWindow.webContents.send("B",o))})};