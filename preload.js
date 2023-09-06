const { contextBridge, clipboard } = require("electron");

contextBridge.exposeInMainWorld("context", {
    readClipboard: () => clipboard.readText(),
    writeClipboard: (text) => clipboard.writeText(text),
});
