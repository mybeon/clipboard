const { app, Menu, nativeImage, Tray } = require("electron");
const path = require("path");
const createWindow = require("./utils/createWindow");

app.commandLine.appendSwitch("ignore-gpu-blacklist");
app.commandLine.appendSwitch("disable-gpu");
app.commandLine.appendSwitch("disable-gpu-compositing");

let mainWindow;
let aboutWindow;

const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";

const menu = [
    {
        label: "File",
        submenu: [{ label: "Quit", click: () => app.quit(), accelerator: "CMDorCTRL+w" }],
    },
    {
        label: "Help",
        submenu: [
            {
                label: "Learn more",
                click: async () => {
                    const { shell } = require("electron");
                    await shell.openExternal("https://github.com/mybeon/clipboard");
                },
            },
            { type: "separator" },
            { label: "About", click: createAboutWindow },
        ],
    },
];

const contextMenu = Menu.buildFromTemplate([
    { label: "View app", type: "normal", click: createMainWindow },
    { type: "separator" },
    { label: "Quit", type: "normal", click: () => app.quit() },
]);

function createMainWindow() {
    if (!mainWindow) {
        // setting up the main menu
        mainMenu = Menu.buildFromTemplate(menu);
        Menu.setApplicationMenu(mainMenu);

        // creating the window
        mainWindow = createWindow({
            title: "home",
            width: isDev ? 600 : 350,
            height: 600,
        });

        if (isDev) {
            mainWindow.webContents.openDevTools();
        }

        mainWindow.once("closed", () => {
            mainWindow = undefined;
        });
    }
}

function createAboutWindow() {
    if (!aboutWindow) {
        aboutWindow = createWindow({
            title: "about",
            width: 200,
            height: 200,
            frame: false,
        });

        aboutWindow.once("closed", () => {
            aboutWindow = undefined;
        });
    }
}

async function createTray() {
    const iconPath = path.join(
        app.getAppPath(),
        "app",
        "electron",
        "assets",
        "tray_300x300.png"
    );
    const icon = nativeImage.createFromPath(iconPath);
    const tray = new Tray(icon);
    tray.setContextMenu(contextMenu);
}

app.whenReady().then(() => {
    createTray();
});

app.on("window-all-closed", () => {});

require("./utils/clipboard");
