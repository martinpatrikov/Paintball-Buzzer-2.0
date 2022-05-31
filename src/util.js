// Util
export function getHalf(ev) {
    if (typeof ev == 'string') {
        return ev;
    }
    const button = ev.target;
    return button.id.includes('bottom') ? 'bottom' : 'top';
}

export function addZeros(secondsInTimer, minutesInTimer, min, sec) {
    if (min < 10) {
        min = '0' + min;
    }
    if (sec < 10) {
        sec = '0' + sec;
    }

    secondsInTimer.innerHTML = sec;
    minutesInTimer.innerHTML = min;
}