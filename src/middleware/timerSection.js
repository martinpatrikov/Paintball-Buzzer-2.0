import { plusMinusTime, plusMinusResult} from '../plusMinus.js';
import { addZeros } from '../util.js';

export function timerSection(ev) {
    const button = ev.target;
    const classes = Array.from(button.classList);
    if (!classes.includes('action')) {
        return;
    }
    if (classes.includes('preset')){
        let time = button.value;
        const target = button.parentNode.parentNode.id;
        let secondsInTimer = document.getElementById(`${target}-seconds`);
        let minutesInTimer = document.getElementById(`${target}-minutes`);

        const min = Math.floor(time/60);
        const sec = time - (min * 60);
        
        addZeros(secondsInTimer, minutesInTimer, min, sec);
    }else{
        plusMinusTime(ev);
    }
}