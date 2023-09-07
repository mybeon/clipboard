const { contextBridge, clipboard } = require("electron");

contextBridge.exposeInMainWorld("context", {
    readClipboard: () => clipboard.readText(),
    writeClipboard: (text) => clipboard.writeText(text),
    clearClipboard: () => clipboard.clear(),
    version: process.env.npm_package_version,
});
