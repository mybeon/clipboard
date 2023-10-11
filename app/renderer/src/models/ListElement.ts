import truncate from "../utils/truncate";
import formatDate from "../utils/formatDate";
import { list } from "../script";
import type { ElectronAPI } from "../script";
const notification = <HTMLSpanElement>document.querySelector(".notification");
const tooltip = <HTMLSpanElement>document.querySelector(".tooltip");

declare const electronAPI: ElectronAPI;

export default class {
    text: string;
    date: number;
    id: number;
    insertedEl: HTMLLIElement;
    timeout: NodeJS.Timeout;

    constructor(text: string, date: number) {
        this.text = text;
        this.date = date;
        this.id = Math.ceil(Math.random() * 100 * 100);
        this.init();
        this.insertedEl = <HTMLLIElement>document.getElementById(this.id.toString());
        this.listeners();
        this.timeout;
    }

    init() {
        const element = `
        <li data-content="${this.text}" id="${this.id}">
            <img src="./icons/doc.svg" />
            <div class="content">
                <p>${truncate(this.text)}</p>
                <div class="info">
                    <span>${formatDate(this.date)}</span>
                    ${this.text.length > 34 ? '<img src="./icons/tooltip.svg" />' : ""}
                <div/>
            </div>
        </li>
        `;
        list.insertAdjacentHTML("afterbegin", element);
    }

    listeners() {
        this.insertedEl.addEventListener("click", this.onClick.bind(this));
        this.insertedEl
            .querySelector(".info img")
            ?.addEventListener("mouseenter", this.onHover.bind(this));
        this.insertedEl
            .querySelector(".info img")
            ?.addEventListener("mouseleave", this.onLeave.bind(this));
    }

    onClick() {
        notification.classList.add("active");
        electronAPI.writeToClipboard(this.text);
        setTimeout(() => {
            notification.classList.remove("active");
        }, 1800);
    }

    onHover(e: MouseEvent) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            tooltip.style.display = "inline";
            tooltip.style.top = e.y + 10 + "px";
            tooltip.style.left = e.x + "px";
            tooltip.innerHTML = this.text;
        }, 800);
    }

    onLeave() {
        clearTimeout(this.timeout);
        tooltip.style.display = "none";
    }
}
