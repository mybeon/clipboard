import ListElement from "./models/ListElement.js";
const clearBtn = <HTMLElement>document.querySelector("#clear");

type ClipboardElement = {
    text: string;
    date: number;
};

export type ElectronAPI = {
    clearClipboard: () => void;
    getClipboard: () => Promise<ClipboardElement[]>;
    writeToClipboard: (text: string) => void;
};

declare const electronAPI: ElectronAPI;

export const list = <HTMLUListElement>document.querySelector("#list");
let prevText: string | undefined;

clearBtn.addEventListener("click", () => {
    list.innerHTML = "";
    electronAPI.clearClipboard();
});

window.addEventListener("DOMContentLoaded", async () => {
    const content = await electronAPI.getClipboard();
    content.forEach(el => {
        new ListElement(el.text, el.date);
    });
    prevText = content[content.length - 1]?.text;
});

setInterval(async () => {
    const content = await electronAPI.getClipboard();
    if (content.length !== 0) {
        const lastElement = content[content.length - 1];
        if (prevText !== lastElement.text) {
            new ListElement(lastElement.text, lastElement.date);
            prevText = lastElement.text;
        }
    }
}, 1000);
