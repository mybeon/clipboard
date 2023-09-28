const { app, BrowserWindow } = require("electron");
const path = require("path");

module.exports = function ({ title, width, height, frame = true, resizable = false }) {
    const window = new BrowserWindow({
        title: title + "Window",
        width,
        height,
        frame,
        resizable,
        webPreferences: {
            sandbox: true,
            preload: path.join(app.getAppPath(), "app", "electron", "preload.js"),
        },
        show: false,
    });

    // show when loading is finished
    window.webContents.on("did-finish-load", () => {
        window.show();
        window.focus();
    });

    // load file
    const isDev = process.env.NODE_ENV === "development";

    if (isDev) {
        window.loadURL(`http://localhost:3000/${title}.html`);
    } else {
        window.loadFile(path.join(app.getAppPath(), "app", "build", `${title}.html`));
    }

    return window;
};
