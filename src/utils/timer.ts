const startTimer = (): { interval: NodeJS.Timeout | null, remainingTime: number | null } => {
    let interval: NodeJS.Timeout | null = null;
    let remainingTime: number | null = null;

    const currentTime = new Date();
    const oneMinuteLater = new Date(currentTime.getTime() + (1 * 60000));
    localStorage.setItem("expireTime", oneMinuteLater.toString());

    const expireTimeString = localStorage.getItem("expireTime");
    if (expireTimeString) {
        const expireTime = new Date(expireTimeString);

        // Calculate remaining time
        const currentTime = new Date();
        const timeDifference = expireTime.getTime() - currentTime.getTime();
        remainingTime = Math.floor(timeDifference / 1000);

        // Start the timer if there is remaining time
        if (remainingTime > 0) {
            interval = setInterval(() => {
                remainingTime = (remainingTime && remainingTime > 0) ? remainingTime - 1 : null;
            }, 1000);
        }
    }

    return { interval, remainingTime };
};
