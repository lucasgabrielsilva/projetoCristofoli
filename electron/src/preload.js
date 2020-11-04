const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
    "api", {
        send: (type, data) => {
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
        }
    }
);