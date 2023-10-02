import { app, BrowserWindow } from "electron";
import path from "path";

type Args = {
    title: string;
    width: number;
    height: number;
    frame?: boolean;
    resizable?: boolean;
};

export default function ({
    title,
    width,
    height,
    frame = true,
    resizable = false,
}: Args): BrowserWindow {
    const window = new BrowserWindow({
        title: title + "Window",
        width,
        height,
        frame,
        resizable,
        webPreferences: {
            sandbox: true,
            preload: path.join(app.getAppPath(), "app", "electron", "build", "preload.js"),
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
        window.loadFile(path.join(app.getAppPath(), "app", "renderer", "build", `${title}.html`));
    }

    return window;
}
