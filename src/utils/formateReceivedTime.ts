// Function to format received time to include day and time
export const formatReceivedTime = (timestamp: string): string => {
    const receivedDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const timeString = receivedDate.toLocaleTimeString();
    const formattedTime = convertTo12HourFormat(timeString);

    if (receivedDate.toDateString() === today.toDateString()) {
        return `Today @ ${formattedTime}`;
    } else if (receivedDate.toDateString() === yesterday.toDateString()) {
        return `Yesterday @ ${formattedTime}`;
    } else {
        return `${receivedDate.toLocaleDateString()} @ ${formattedTime}`;
    }
};

function convertTo12HourFormat(timeString: string) {
    let [hours, minutes] = timeString.split(':');
    minutes = minutes.split(' ')[0];
    hours = parseInt(hours, 10).toString();
    const period = parseInt(hours) >= 12 ? 'PM' : 'AM';
    hours = String(parseInt(hours) % 12 || 12);
    return `${hours}:${minutes} ${period}`;
}
