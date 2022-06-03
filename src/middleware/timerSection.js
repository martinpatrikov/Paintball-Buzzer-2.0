import { plusMinusTime, plusMinusResult } from '../plusMinus.js';
import { addZeros } from '../util.js';

export function timerSection(ev) {
    const button = ev.target;
    const classes = Array.from(button.classList);
    if (!classes.includes('action')) {
        return;
    }
    if (classes.includes('preset')) {
        if (classes.includes('custom')) {
            let input = prompt('Custom time (seconds): ', '90');
            if (input) {
                button.value = input;
            }else{
                return ;
            }
            
        }
        Array.from(button.parentNode.parentNode.children).forEach(el => {
            el.querySelectorAll('.preset').forEach(box => box.classList.remove('active'));
        }); // .querySelectorAll('.preset').forEach(box => box.classList.remove('active'));
        let time = button.value;
        button.classList.add('active');
        const target = button.parentNode.parentNode.parentNode.id;
        let secondsInTimer = document.getElementById(`${target}-seconds`);
        let minutesInTimer = document.getElementById(`${target}-minutes`);

        const min = Math.floor(time / 60);
        const sec = time - (min * 60);

        addZeros(secondsInTimer, minutesInTimer, min, sec);
    } else {
        plusMinusTime(ev);
    }
}