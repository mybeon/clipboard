const { clipboard, ipcMain, shell, app } = require("electron");

let content = [];

setInterval(() => {
    const text = clipboard.readText();
    if (text.trim() !== "" && !content.some(el => el.text === text)) {
        content.push({ text, date: Date.now() });
    }
}, 1000);

ipcMain.handle("clipboard:get", () => {
    return content;
});

ipcMain.on("clipboard:write", (_, text) => {
    clipboard.writeText(text);
});

ipcMain.on("clipboard:clear", () => {
    content = [];
    clipboard.clear();
});

ipcMain.on("open-url", (_, url) => {
    shell.openExternal(url);
});

ipcMain.handle("version", () => {
    return app.getVersion();
});
