import type { BrowserWindow } from "electron";
import { Menu, Notification, Tray, app, nativeImage } from "electron";
import path from "path";
import createWindow from "./utils/createWindow";

app.commandLine.appendSwitch("ignore-gpu-blacklist");
app.commandLine.appendSwitch("disable-gpu");
app.commandLine.appendSwitch("disable-gpu-compositing");

let mainWindow: BrowserWindow | undefined;
let aboutWindow: BrowserWindow | undefined;

const isDev = process.env.NODE_ENV === "development";

const mainMenu = Menu.buildFromTemplate([
    {
        label: "File",
        submenu: [
            { label: "Close window", click: () => mainWindow?.close(), accelerator: "CMDorCTRL+w" },
            { label: "Quit", click: () => app.quit(), accelerator: "CMDorCTRL+q" },
        ],
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
]);

const contextMenu = Menu.buildFromTemplate([
    { label: "View app", type: "normal", click: createMainWindow },
    { type: "separator" },
    { label: "Quit", type: "normal", click: () => app.quit() },
]);

function createMainWindow() {
    if (!mainWindow) {
        // setting up the main menu
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
    } else {
        mainWindow?.show();
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
    const iconPath = path.resolve("app", "electron", "assets", "tray_300x300.png");
    const icon = nativeImage.createFromPath(iconPath);
    const tray = new Tray(icon);
    tray.setContextMenu(contextMenu);
}

app.whenReady().then(() => {
    if (process.env.NODE_ENV === "test") {
        createMainWindow();
        return;
    }

    createTray();

    new Notification({
        title: "Clipboard is running",
        body: "In the background keeping track of the clipboard history.",
    }).show();
});

app.on("window-all-closed", () => {});

import "./utils/clipboard";
