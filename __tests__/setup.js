const { _electron: electron } = require("playwright");

export async function launchApp() {
    const electronApp = await electron.launch({ args: ["app/electron/build/app.js"] });
    const window = await electronApp.firstWindow();

    return [window, electronApp];
}
