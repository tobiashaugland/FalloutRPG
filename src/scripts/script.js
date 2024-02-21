const main = document.querySelector("#main");
const diceRoller = document.querySelector(".dice-roller");
createButtons(20)
createButtons(6)

createCombatDice()
function createCombatDice() {
    for (let i = 1; i <= 6; i++) {
        const button = document.createElement("button");
        button.classList.add("dice-roller__button", "combat-dice-roller__button");
        button.innerHTML = `${i} 
        <img class="combat-dice__img" src="./images/combat-dice.png">
        `
        button.addEventListener("click", () => {
            const diceArray = rollDice(6, i);
            for (let i = 0; i < diceArray.length; i++) {
                if (diceArray[i] == 1) {
                    console.log(diceArray[i], "1dmg")
                }
                if (diceArray[i] == 2) {
                    console.log(diceArray[i], "2dmg");
                }
                if (diceArray[i] == 3 || diceArray[i] == 4) {
                    console.log(diceArray[i], "0dmg");
                }
                if (diceArray[i] == 5 || diceArray[i] == 6) {
                    console.log(diceArray[i], "1 + effect")
                }
            }

        })
        document.querySelector(".combat-dice-roller").appendChild(button);
    }

}
function createButtons(diceType) {
    const div = document.createElement("div");
    div.classList.add("dice-roller__container");
    diceRoller.appendChild(div);
    for (let i = 1; i <= 6; i++) {
        const button = document.createElement("button");
        button.classList.add("dice-roller__button");
        button.textContent = `${i} d${diceType}`;
        button.addEventListener("click", () => {
            rollDice(diceType, i);
        })
        div.appendChild(button);
    }

}

function rollDice(diceType, diceAmount) {
    const diceArray = []
    for (let i = 0; i < diceAmount; i++) {
        const die = Math.floor(Math.random() * diceType) + 1;
        diceArray.push(die);
    }
    console.log(diceArray);
    return diceArray
}