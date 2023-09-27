const { clipboard, ipcMain } = require("electron");

let content = [];

setInterval(() => {
    const text = clipboard.readText();
    if (text.trim() !== "" && !content.includes(text)) {
        content.push(text);
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
