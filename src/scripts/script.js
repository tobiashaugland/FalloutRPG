const main = document.querySelector("#main");
const diceRoller = document.querySelector(".dice-roller");
createButtons(20)
createButtons(6)

createCombatDice()

function createButtons(diceType) {
    const div = document.createElement("div");
    div.classList.add("dice-roller__button__container");
    const div2 = document.createElement("div");
    div2.classList.add("dice-roller__container");
    diceRoller.appendChild(div2);
    const p = document.createElement("p");
    p.classList.add("dice-roller__result");
    div2.appendChild(p);
    div2.appendChild(div);
    for (let i = 1; i <= 6; i++) {
        const button = document.createElement("button");
        button.classList.add("dice-roller__button");
        button.textContent = `${i} d${diceType}`;
        button.addEventListener("click", () => {
            const diceResult = rollDice(diceType, i);
            styledDiceResult = [];
            diceResult.forEach((res) => {
                styledDiceResult.push(" " + res)
            })
            p.innerHTML = styledDiceResult;
            p.classList.add("color-white");
            setTimeout(() => {
                p.classList.remove("color-white");
            }, 75);
        });
        div.appendChild(button);
    }

}

function createCombatDice() {
    const div = document.createElement("div");
    div.classList.add("dice-roller__button__container");
    const div2 = document.createElement("div");
    div2.classList.add("dice-roller__container");
    diceRoller.appendChild(div2);
    const p = document.createElement("p");
    p.classList.add("dice-roller__result");
    div2.appendChild(p);
    div2.appendChild(div)
    for (let i = 1; i <= 6; i++) {
        const button = document.createElement("button");
        button.classList.add("dice-roller__button");
        button.innerHTML = `${i} 
        <img class="combat-dice__img" src="./images/combat-dice.png">
        `
        button.addEventListener("click", () => {
            const diceArray = rollDice(6, i);
            const resultArray = [];
            let dmg = 0;
            let effects = 0;
            for (let i = 0; i < diceArray.length; i++) {
                if (diceArray[i] == 1) {
                    console.log(diceArray[i], "1dmg")
                    dmg++;
                }
                if (diceArray[i] == 2) {
                    console.log(diceArray[i], "2dmg");
                    dmg += 2;
                }
                if (diceArray[i] == 3 || diceArray[i] == 4) {
                    console.log(diceArray[i], "0dmg");
                }
                if (diceArray[i] == 5 || diceArray[i] == 6) {
                    console.log(diceArray[i], "1 + effect")
                    dmg++;
                    effects++;
                }
                console.log(`${dmg} damage + ${effects}`)
                p.innerHTML = `${dmg} damage ${effects > 0 ? '+ ' + effects + '<img class="combat-dice__img" src="./images/combat-dice.png">' : ""}`;
                p.classList.add("color-white");
                setTimeout(() => {
                    p.classList.remove("color-white");
                }, 75);
            }

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
    //console.log(diceArray);
    return diceArray
}
rollHitLocation();
function rollHitLocation() {
    document.querySelector(".hit-location__btn").addEventListener("click", () => {
        const mrHandy = document.querySelector("#mr-handy").checked;
        const p = document.querySelector(".hit-location__result");
        const diceRoll = rollDice(20, 1);
        let hitLocation = "";
        if (diceRoll <= 2) {
            hitLocation = mrHandy ? "Eyes" : "Head";
        }
        else if (diceRoll <= 8) {
            hitLocation = mrHandy ? "Body" : "Torso";
        }
        else if (diceRoll <= 11) {
            hitLocation = mrHandy ? "Arm 1" : "Right arm";
        }
        else if (diceRoll <= 14) {
            hitLocation = mrHandy ? "Arm 2" : "Left arm";
        }
        else if (diceRoll <= 17) {
            hitLocation = mrHandy ? "Arm 3" : "Right leg";
        }
        else if (diceRoll <= 20) {
            hitLocation = mrHandy ? "Thruster" : "Left leg";
        }
        console.log(hitLocation, diceRoll);
        p.innerHTML = hitLocation;
        p.classList.add("color-white");
        setTimeout(() => {
            p.classList.remove("color-white");
        }, 75);
    });
}
