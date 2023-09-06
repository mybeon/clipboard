export default function (text) {
    if (text.length > 34) {
        return text.substring(0, 34) + "...";
    }
    return text;
}
