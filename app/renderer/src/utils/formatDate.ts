export default function (timestamp: number): string {
    const date = new Date(timestamp);
    const month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
    const minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;

    return `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${hours}:${minutes}`;
}
