import { app, clipboard, ipcMain, shell } from "electron";
import sanitizeHtml from "sanitize-html";
import type { ClipboardElement } from "../types";

let content: ClipboardElement[] = [];

setInterval(() => {
    const text = clipboard.readText().trim();

    const sanitizeInput = sanitizeHtml(text, {
        allowedTags: [],
        allowedAttributes: {},
    });

    if (sanitizeInput.trim() !== "" && !content.some(el => el.text === sanitizeInput)) {
        content.push({
            text: sanitizeInput,
            date: Date.now(),
            id: Math.ceil(Math.random() * 100 * 100),
        });
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
