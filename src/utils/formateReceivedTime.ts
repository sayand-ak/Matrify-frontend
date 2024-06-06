// Function to format received time to include day and time
export const formatReceivedTime = (timestamp: string): string => {
    const receivedDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (receivedDate.toDateString() === today.toDateString()) {
        return `Today @ ${receivedDate.toLocaleTimeString()}`;
    } else if (receivedDate.toDateString() === yesterday.toDateString()) {
        return `Yesterday @ ${receivedDate.toLocaleTimeString()}`;
    } else {
        return `${receivedDate.toLocaleDateString()} @ ${receivedDate.toLocaleTimeString()}`;
    }
};