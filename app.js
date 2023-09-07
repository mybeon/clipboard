const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

app.commandLine.appendSwitch("ignore-gpu-blacklist");
app.commandLine.appendSwitch("disable-gpu");
app.commandLine.appendSwitch("disable-gpu-compositing");

const isDev = process.env.ELECTRON_ENV === "development";

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

function createMainWindow() {
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

app.whenReady().then(() => {
    createMainWindow();
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);
});
