function rollDice() {
    const dice = [...document.querySelectorAll(".die-list")];
    dice.forEach(die => {
        toggleClasses(die);
        // with dataset we can read/write into data-* custom attributes in this case roll
        die.dataset.roll = getRandomNumber(1, 6);
        console.log(die.dataset.roll)
    });
}

function toggleClasses(die) {
    die.classList.toggle("odd-roll");
    // die.classList.toggle("even-roll");
}

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById("roll-button").addEventListener("click", rollDice);
