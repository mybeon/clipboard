const { app, BrowserWindow, Menu, nativeImage, Tray } = require("electron");
const path = require("path");
const fs = require("fs/promises");

app.commandLine.appendSwitch("ignore-gpu-blacklist");
app.commandLine.appendSwitch("disable-gpu");
app.commandLine.appendSwitch("disable-gpu-compositing");

const isDev = process.env.NODE_ENV === "development";

const webPreferences = {
    nodeIntegration: true,
    preload: path.join(__dirname, "preload.js"),
};

const menu = [
    {
        label: "File",
        submenu: [{ label: "Quit", click: () => app.quit(), accelerator: "CMDorCTRL+w" }],
    },
    {
        label: "Help",
        submenu: [{ label: "About", click: createAboutWindow }],
    },
];

const contextMenu = Menu.buildFromTemplate([
    { label: "View app", type: "normal", click: createMainWindow },
    { type: "separator" },
    { label: "Quit", type: "normal", click: () => app.quit() },
]);

function createMainWindow() {
    // setting up the main menu
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    // creating the window
    const mainWindow = new BrowserWindow({
        title: "clipboard",
        width: isDev ? 600 : 350,
        height: 600,
        webPreferences,
        resizable: false,
    });

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
}

function createAboutWindow() {
    const aboutWindow = new BrowserWindow({
        title: "aboutWindow",
        width: 200,
        height: 200,
        frame: false,
        webPreferences,
        resizable: false,
    });

    aboutWindow.loadFile(path.join(__dirname, "./renderer/about.html"));
}

async function createTray() {
    const iconPath = path.join(__dirname, "/build/icons/512x512.png");
    const icon = nativeImage.createFromPath(iconPath);
    const tray = new Tray(icon);
    tray.setContextMenu(contextMenu);
}

app.whenReady().then(() => {
    createTray();
});

app.on("window-all-closed", () => {});
