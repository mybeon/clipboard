const { clipboard, ipcMain, shell, app } = require("electron");
const sanitizeHtml = require("sanitize-html");

let content = [];

setInterval(() => {
    const text = clipboard.readText();

    const sanitizeInput = sanitizeHtml(text, {
        allowedTags: [],
        allowedAttributes: {},
    });

    if (sanitizeInput.trim() !== "" && !content.some(el => el.text === sanitizeInput)) {
        content.push({ text: sanitizeInput, date: Date.now() });
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
