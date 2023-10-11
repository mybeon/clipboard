export default function (text: string): string {
    console.log("text", text);
    console.log("length", text.length);

    if (text.length > 34) {
        return text.substring(0, 34) + "...";
    }
    return text;
}
