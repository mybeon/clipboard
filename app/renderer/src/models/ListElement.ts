import truncate from "../utils/truncate";
import formatDate from "../utils/formatDate";
import { list } from "../script";
const notification = <HTMLElement>document.querySelector(".notification");

export default class {
    text: string;
    date: number;
    id: number;
    insertedEl: HTMLLIElement;

    constructor(text: string, date: number) {
        this.text = text;
        this.date = date;
        this.id = Math.ceil(Math.random() * 100 * 100);
        this.init();
        this.insertedEl = <HTMLLIElement>document.getElementById(this.id.toString());
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

    onClick() {
        notification.classList.add("active");
        setTimeout(() => {
            notification.classList.remove("active");
        }, 1800);
    }
}
