const { expect, test } = require("@playwright/test");
const { launchApp } = require("./setup");

test("Check if main title is visible", async () => {
    const [window] = await launchApp();
    const title = await window.$eval("h1", el => el.textContent);

    expect(title).toEqual("Clipboard");
});
