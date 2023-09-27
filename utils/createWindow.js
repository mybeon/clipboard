const { app, BrowserWindow, ipcMain, clipboard } = require("electron");
const path = require("path");
const clipboardManager = require("./clipboard");

module.exports = function ({ title, width, height, frame = true, resizable = false }) {
    const window = new BrowserWindow({
        title: title + "Window",
        width,
        height,
        frame,
        resizable,
        webPreferences: {
            sandbox: true,
            preload: path.join(app.getAppPath(), "preload.js"),
        },
        show: false,
    });

    // show when loading is finished
    window.webContents.on("did-finish-load", () => {
        window.show();
        window.focus();
    });

    // load file
    window.loadFile(path.join(app.getAppPath(), "renderer", `${title}.html`));

    return window;
};
