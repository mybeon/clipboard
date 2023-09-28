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
    window.loadFile(path.join(app.getAppPath(), "app", "src", `${title}.html`));

    return window;
};
