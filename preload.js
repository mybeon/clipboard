const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    getClipboard: () => ipcRenderer.invoke("clipboard:get"),
    writeToClipboard: text => ipcRenderer.send("clipboard:write", text),
    clearClipboard: () => ipcRenderer.send("clipboard:clear"),
    openUrl: url => ipcRenderer.send("open-url", url),
    version: () => ipcRenderer.invoke("version"),
});
