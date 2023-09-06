import truncate from "./utils/truncate.js";
import formatDate from "./utils/formatDate.js";
const list = document.querySelector("#list");
let prevText;
const content = [];

setInterval(() => {
    const text = context.readClipboard();
    if (prevText !== text && !content.includes(text)) {
        const element = `
        <li>
            <img src="./assets/icons/doc.svg" />
            <div class="content">
                <p>${truncate(text)}</p>
                <span>${formatDate(Date.now())}</span>
            </div>
        </li>
        `;
        content.push(text);
        list.insertAdjacentHTML("afterbegin", element);
        prevText = text;
        return;
    }
}, 1000);
