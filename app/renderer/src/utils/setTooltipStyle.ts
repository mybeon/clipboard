export default function (event: MouseEvent, tooltip: HTMLSpanElement): void {
    const isTop = window.outerHeight - event.y > window.outerHeight / 2;
    tooltip.style.display = "inline";
    tooltip.style.left = event.x + "px";
    if (isTop) {
        tooltip.style.top = event.y + 10 + "px";
        tooltip.style.bottom = "unset";
    } else {
        tooltip.style.bottom = window.outerHeight - event.y - 10 + "px";
        tooltip.style.top = "unset";
    }
}
