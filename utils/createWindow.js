const { BrowserWindow } = require("electron");
const path = require("path");

module.exports = function ({ title, width, height, frame = true, resizable = false }) {
    const window = new BrowserWindow({
        title: title + "Window",
        width,
        height,
        frame,
        resizable,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "../preload.js"),
        },
    });

    window.loadFile(path.join(__dirname, `../renderer/${title}.html`));

    return window;
};
