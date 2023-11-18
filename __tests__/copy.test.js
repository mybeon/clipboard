const { expect, test } = require("@playwright/test");
const { launchApp } = require("./setup");

let page;
let electron;

test.beforeAll("launchApp", async () => {
    const [window, app] = await launchApp();
    page = window;
    electron = app;
});

test("Check display of copied text", async () => {
    await page.evaluate('navigator.clipboard.writeText("hello man")');
    await page.waitForSelector(".content p");
    const listElementContent = await page.$eval(".content p", el => el.textContent);
    expect(listElementContent).toEqual("hello man");
});

test("Copy multiple entries", async () => {
    await page.evaluate('navigator.clipboard.writeText("hello man again")');
    await page.waitForTimeout(1000);
    const listElementContents = await page.$$(".content p");
    for await (const element of listElementContents) {
        const text = await element.textContent();
        expect(text).toContain("hello man");
    }
});

test("Clear clipboard", async () => {
    const btn = await page.$("#clear");
    await btn.click();
    const confirm = await page.$(".actions .confirm");
    await confirm.click();
    const p = await page.$eval("p.empty", el => el.innerText);
    expect(p).toEqual("Clipboard is empty !");
});

test.afterAll(() => {
    electron.evaluate(({ app }) => {
        app.quit();
    });
});
