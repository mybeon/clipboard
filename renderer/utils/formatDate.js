export default function (timestamp) {
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

    return `${
        month[date.getMonth()]
    } ${date.getDay()}, ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}
