import { ListElement } from "./models/User.js";
const clearBtn = document.querySelector("#clear");

export const list = document.querySelector("#list");
let prevText;

clearBtn.addEventListener("click", () => {
    list.innerHTML = null;
    electronAPI.clearClipboard();
});

window.addEventListener("DOMContentLoaded", async () => {
    const content = await electronAPI.getClipboard();
    content.forEach(el => {
        new ListElement(el);
    });
    prevText = content[content.length - 1];
});

setInterval(async () => {
    const content = await electronAPI.getClipboard();
    if (content.length !== 0) {
        const lastElement = content[content.length - 1];
        if (prevText !== lastElement) {
            new ListElement(lastElement);
            prevText = lastElement;
        }
    }
}, 1000);
