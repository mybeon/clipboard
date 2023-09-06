const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

const isDev = process.env.ELECTRON_ENV === "development";

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
        width: isDev ? 850 : 500,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js"),
        },
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
    });

    aboutWindow.loadFile(path.join(__dirname, "./renderer/about.html"));
}

app.whenReady().then(() => {
    createMainWindow();
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);
});
