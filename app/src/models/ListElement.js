import truncate from "../utils/truncate.js";
import formatDate from "../utils/formatDate.js";
import { list } from "../script.js";
const notification = document.querySelector(".notification");

export default class {
    constructor(text, date) {
        this.text = text;
        this.date = date;
        this.id = Math.ceil(Math.random() * 100 * 100);
        this.init();
        this.insertedEl = document.getElementById(this.id);
        this.listener();
    }

    init() {
        const element = `
        <li data-content="${this.text}" id="${this.id}">
            <img src="./icons/doc.svg" />
            <div class="content">
                <p>${truncate(this.text)}</p>
                <span>${formatDate(this.date)}</span>
            </div>
        </li>
        `;
        list.insertAdjacentHTML("afterbegin", element);
    }

    listener() {
        this.insertedEl.addEventListener("click", this.onClick.bind(this));
    }

    onClick(e) {
        notification.classList.add("active");
        setTimeout(() => {
            notification.classList.remove("active");
        }, 1800);
    }
}
