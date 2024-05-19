const main = document.querySelector("#main");
const diceRoller = document.querySelector(".dice-roller");
createButtons(20)
createCombatDice()
createButtons(6)


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
    div.appendChild(createCustomDice(diceType, p));


}

function createCombatDice() {
    const div = document.createElement("div");
    div.classList.add("dice-roller__button__container", "dice-roller__button__container--combat");
    const div2 = document.createElement("div");
    div2.classList.add("dice-roller__container");
    diceRoller.appendChild(div2);
    const p = document.createElement("p");
    p.classList.add("dice-roller__result", "dice-roller__result--combat");
    div2.appendChild(p);
    div2.appendChild(div)
    for (let i = 1; i <= 6; i++) {
        const button = document.createElement("button");
        button.classList.add("dice-roller__button");
        button.innerHTML = `${i} 
        <img class="combat-dice__img" src="./images/combat-dice.png" alt="vault boy">
        `
        button.addEventListener("click", () => {
            const diceArray = rollDice(6, i);
            //const resultArray = [];
            let dmg = 0;
            let effects = 0;
            for (let i = 0; i < diceArray.length; i++) {
                if (diceArray[i] == 1) {
                    dmg++;
                }
                if (diceArray[i] == 2) {
                    dmg += 2;
                }
                if (diceArray[i] == 3 || diceArray[i] == 4) {
                }
                if (diceArray[i] == 5 || diceArray[i] == 6) {
                    dmg++;
                    effects++;
                }
                p.innerHTML = `${dmg} damage ${effects > 0 ? '+ ' + effects + '<img class="combat-dice__img" src="./images/combat-dice.png" alt="vault boy">' : ""}`;
                p.classList.add("color-white");
                setTimeout(() => {
                    p.classList.remove("color-white");
                }, 75);
            }

        })
        div.appendChild(button);
    }

    createCustomCD()


}




function createCustomCD() {
    const div = document.createElement("div");
    div.classList.add("dice-roller__button--custom");
    div.innerHTML = `
    <input type="number" class="dice-roller__button--custom-input" value="7">
    <button class="dice-roller__button--custom-btn">
        7 <img class="combat-dice__img" src="./images/combat-dice.png" alt="vault boy">
    </button>
    `;
    document.querySelector(".dice-roller__button__container--combat").appendChild(div);

    const btn = div.querySelector(".dice-roller__button--custom-btn")
    const input = div.querySelector(".dice-roller__button--custom-input")
    btn.addEventListener("click", () => {
        rollCombatDice(input.value)
    });
    input.addEventListener("input", () => {
        input.value = input.value;
        const value = input.value;
        console.log(value);
        btn.innerHTML = `${value} 
        <img class="combat-dice__img" src="./images/combat-dice.png" alt="vault boy">
        `;
    });

}


function rollCombatDice(x) {
    const p = document.querySelector(".dice-roller__result--combat");
    const diceArray = rollDice(6, x);
    console.log(x);
    //const resultArray = [];
    let dmg = 0;
    let effects = 0;
    for (let i = 0; i < diceArray.length; i++) {
        if (diceArray[i] == 1) {
            dmg++;
        }
        if (diceArray[i] == 2) {
            dmg += 2;
        }
        if (diceArray[i] == 3 || diceArray[i] == 4) {
        }
        if (diceArray[i] == 5 || diceArray[i] == 6) {
            dmg++;
            effects++;
        }
        p.innerHTML = `${dmg} damage ${effects > 0 ? '+ ' + effects + '<img class="combat-dice__img" src="./images/combat-dice.png" alt="vault boy">' : ""}`;
        p.classList.add("color-white");
        setTimeout(() => {
            p.classList.remove("color-white");
        }, 75);
    }
}

function createCustomDice(diceType, appendTo) {
    const diceTypeString = diceType.toString();
    const div = document.createElement("div");
    div.classList.add("dice-roller__button--custom");
    div.innerHTML = `
    <input type="number" class="dice-roller__button--custom-input" value="7">
    <button class="dice-roller__button--custom-btn">7 d${diceTypeString}</button>
    `;

    const btn = div.querySelector(".dice-roller__button--custom-btn")
    const input = div.querySelector(".dice-roller__button--custom-input")

    btn.addEventListener("click", () => {
        appendTo.textContent = rollDice(diceType, input.value)
    });

    input.addEventListener("input", () => {
        const value = input.value;
        btn.innerHTML = `${value} d${diceTypeString}`;
    });

    return (div);

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


apTracker();
function apTracker() {
    const plus = document.querySelector(".ap-tracker__btn-plus");
    const minus = document.querySelector(".ap-tracker__btn-minus");
    const apInput = document.querySelector(".ap-tracker__input");

    plus.addEventListener("click", () => {
        apInput.value++;
    });

    minus.addEventListener("click", () => {
        if (apInput.value > 0) {
            apInput.value--;
        }
    });
}

initiativeTracker();
function initiativeTracker() {
    const newContainer = document.querySelector(".initiative__tracker__new__container");
    const newName = document.querySelector(".initiative__tracker__input__new--name");
    const newInit = document.querySelector(".initiative__tracker__input__new--initiative");
    const newHP = document.querySelector(".initiative__tracker__input__new--hp");
    const newBtn = document.querySelector(".initiative__tracker__new--btn");
    const initiativeContainer = document.querySelector(".initiative__container");


    newBtn.addEventListener("click", () => {
        const name = newName.value;
        const initiative = newInit.value;
        const hp = newHP.value;
        const initContainer = document.createElement("div");
        initContainer.classList.add("initiative__tracker__container", "initiative__tracker__container--new", "d-flex")
        initContainer.innerHTML += `
                <label class="d-flex flex-column initiative__tracker__label">
                    Name:
                    <input class="initiative__tracker__input" type="text" value=${name}>
                </label>
                <label class="d-flex flex-column initiative__tracker__label initiative__tracker__label--initiative">
                    Initiative:
                    <input class="initiative__tracker__input initiative__tracker__input--initiative" type="number" name="" id="" value=${initiative}>
                </label>
                <label class="d-flex flex-column initiative__tracker__label initiative__tracker__label--hp">
                    HP:
                    <input class="initiative__tracker__input initiative__tracker__input--hp" type="number" name="" id="" value=${hp}>
                </label>
        `;
        initiativeContainer.appendChild(initContainer);
        newName.value = "";
        newInit.value = "";
        newHP.value = "";

        const upBtn = document.createElement('button');
        upBtn.classList.add("btn", "initiative__tracker--btn", "initiative__tracker--btn-up", "material-symbols-outlined");
        upBtn.innerHTML = "arrow_drop_up";
        upBtn.addEventListener('click', () => {
            initiativeContainer.insertBefore(initContainer, initContainer.previousElementSibling)

        })
        initContainer.appendChild(upBtn);

        const downBtn = document.createElement('button');
        downBtn.classList.add("btn", "initiative__tracker--btn", "initiative__tracker--btn-down", "material-symbols-outlined");
        downBtn.innerHTML = "arrow_drop_down";
        downBtn.addEventListener('click', () => {

            initiativeContainer.insertBefore(initContainer.nextElementSibling, initContainer)
        })
        initContainer.appendChild(downBtn);

        const delBtn = document.createElement('button');
        delBtn.classList.add("btn", "initiative__tracker--btn", "initiative__tracker--btn-delete", "material-symbols-outlined");
        delBtn.innerHTML = "close";
        delBtn.addEventListener('click', () => {
            initContainer.remove()
        })
        initContainer.appendChild(delBtn);




    });


}
function upBtn() {
    const initiativeContainer = document.querySelector(".initiative__container");
    const initiativeCharacters = document.querySelectorAll(".initiative__tracker__container--new");
    console.log(initiativeCharacters);




}

upAndDown();
function upAndDown() {
    const initiativeContainer = document.querySelector(".initiative__container");
    const initiativeCharacters = document.querySelectorAll(".initiative__tracker__container--new");
    console.log(initiativeCharacters);

    for (let i = 0; i < initiativeCharacters.length; i++) {

        const btnUp = initiativeCharacters[i].querySelector(".initiative__tracker--btn-up");
        btnUp.addEventListener("click", () => {
            initiativeContainer.insertBefore(initiativeContainer.children[i], initiativeContainer.children[i].previousElementSibling);
            console.log(initiativeContainer.children[i]);
            console.log(initiativeContainer.children[i].previousElementSibling)
        })
        /* const btnDown = initiativeCharacters[i].querySelector(".initiative__tracker--btn-down");
        btnDown.addEventListener("click", () => {
            initiativeContainer.insertBefore(initiativeContainer.children[i + 1], initiativeContainer.children[i]);
        }) */
    }
}
