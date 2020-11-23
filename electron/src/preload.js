const { contextBridge, ipcRenderer } = require("electron");

let model;
let mode;

contextBridge.exposeInMainWorld(
    "api", {
        send: (type, data) => {
            if(type === 'model'){
                model = data;
            };
            if(type === 'Mode'){
                mode = data;
            };
            ipcRenderer.send(type, data);
        },
        sendSync: (type, data) => {
            ipcRenderer.sendSync(type, data);
        },
        receive: (channel, func) => {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        },
        stop: (channel) => {
            ipcRenderer.removeAllListeners(channel);
        },
        invoke: async (channel, data) => {
            return await ipcRenderer.invoke(channel, data);
        },
        get: (type) => {
            if(type === 'model'){
                return model;
            }
            if(type === 'mode'){
                return mode;
            }
        }
    }
);
