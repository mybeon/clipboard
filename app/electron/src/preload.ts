import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
    getClipboard: () => ipcRenderer.invoke("clipboard:get"),
    writeToClipboard: (text: string) => ipcRenderer.send("clipboard:write", text),
    clearClipboard: () => ipcRenderer.send("clipboard:clear"),
    openUrl: (url: string) => ipcRenderer.send("open-url", url),
    version: () => ipcRenderer.invoke("version"),
});
