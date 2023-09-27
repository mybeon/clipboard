const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    getClipboard: () => ipcRenderer.invoke("clipboard:get"),
    writeToClipboard: text => ipcRenderer.send("clipboard:write", text),
    clearClipboard: () => ipcRenderer.send("clipboard:clear"),
});

// contextBridge.exposeInMainWorld("context", {
//     readClipboard: () => clipboard.readText(),
//     writeClipboard: text => clipboard.writeText(text),
//     clearClipboard: () => clipboard.clear(),
//     openUrl: url => shell.openExternal(url),
//     version: process.env.npm_package_version,
// });
