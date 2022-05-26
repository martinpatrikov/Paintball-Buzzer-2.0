// Util
export function getHalf(ev) {
    if (typeof ev == 'string') {
        return ev;
    }
    const button = ev.target;
    return button.id.includes('bottom') ? 'bottom' : 'top';
}