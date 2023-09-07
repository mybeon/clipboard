import truncate from "./utils/truncate.js";
import formatDate from "./utils/formatDate.js";
const list = document.querySelector("#list");
const notification = document.querySelector(".notification");
const clearBtn = document.querySelector("#clear");

let prevText;
let content = [];

clearBtn.addEventListener("click", () => {
    list.innerHTML = null;
    prevText = null;
    content = [];
    context.clearClipboard();
});

class ListElement {
    constructor(text) {
        this.text = text;
        this.id = Math.ceil(Math.random() * 100 * 100);
        this.init();
        this.insertedEl = document.getElementById(this.id);
        this.listener();
    }

    init() {
        const element = `
        <li data-content="${this.text}" id="${this.id}">
            <img src="./assets/icons/doc.svg" />
            <div class="content">
                <p>${truncate(this.text)}</p>
                <span>${formatDate(Date.now())}</span>
            </div>
        </li>
        `;
        list.insertAdjacentHTML("afterbegin", element);
        content.push(this.text);
        prevText = this.text;
    }

    listener() {
        this.insertedEl.addEventListener("click", this.onClick.bind(this));
    }

    onClick(e) {
        context.writeClipboard(this.text);
        notification.classList.add("active");
        setTimeout(() => {
            notification.classList.remove("active");
        }, 1800);
    }
}

setInterval(() => {
    const text = context.readClipboard();
    if (text.trim() !== "" && prevText !== text && !content.includes(text)) {
        new ListElement(text);
        return;
    }
}, 1000);
