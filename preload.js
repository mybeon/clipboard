const { contextBridge, clipboard, shell } = require("electron");

contextBridge.exposeInMainWorld("context", {
    readClipboard: () => clipboard.readText(),
    writeClipboard: (text) => clipboard.writeText(text),
    clearClipboard: () => clipboard.clear(),
    openUrl: (url) => shell.openExternal(url),
    version: process.env.npm_package_version,
});
