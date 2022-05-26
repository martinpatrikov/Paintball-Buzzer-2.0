export function plusMinusResult(ev) {
    const button = ev.target;
    let firedButton = button.value;
    let team = document.querySelector(`.${button.id}-team`);
    let teamCounter = Number(team.textContent || 0);

    if (firedButton === '-') {
        if (teamCounter > 0) {
            teamCounter -= 1;
            if (teamCounter < 10 && teamCounter >= 0) {
                team.innerHTML = '0' + teamCounter;
            } else {
                team.innerHTML = teamCounter;
            }
        }
    } else if (firedButton === '+') {
        teamCounter += 1;
        if (teamCounter < 10 && teamCounter >= 0) {
            team.innerHTML = '0' + teamCounter;
        } else {
            team.innerHTML = teamCounter;
        }
    }
}

export function plusMinusTime(ev) {
    const button = ev.target;
    if (!Array.from(button.classList).includes('action')) {
        return;
    }
    let firedButton = button.value;
    const className = ev.target.parentNode.className;
    let container = document.querySelector(`#${button.id}-half-${className}`);
    let counter = Number(container.textContent || 0);
    let increment = 1;
    if (className.includes('seconds')) {
        increment = 10;
    }

    if (firedButton === '-') {
        if (counter >= increment) {
            counter -= increment;
            if (counter < 10 && counter >= 0) {
                container.innerHTML = '0' + counter;
            } else {
                container.innerHTML = counter;
            }
        }
    } else if (firedButton === '+') {
        counter += increment;
        if (counter < 10 && counter >= 0) {
            container.innerHTML = '0' + counter;
        } else {
            container.innerHTML = counter;
        }
    }
}