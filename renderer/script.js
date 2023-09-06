const list = document.querySelector("#list");
let prevText;
const content = [];

setInterval(() => {
    const text = context.readClipboard();
    if (prevText !== text && !content.includes(text)) {
        const el = document.createElement("li");
        content.push(text);
        el.innerText = text;
        list.insertAdjacentElement("afterbegin", el);
        prevText = text;
        return;
    }
}, 1000);
