import { ListElement } from "./models/User.js";
const clearBtn = document.querySelector("#clear");

export const list = document.querySelector("#list");
export var prevText;
export let content = [];

clearBtn.addEventListener("click", () => {
    list.innerHTML = null;
    prevText = null;
    content = [];
    context.clearClipboard();
});

setInterval(() => {
    const text = context.readClipboard();
    if (text.trim() !== "" && prevText !== text && !content.includes(text)) {
        new ListElement(text);
        content.push(text);
        prevText = text;
    }
}, 1000);
