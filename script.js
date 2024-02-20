const main = document.querySelector("#main");
const diceRoller = document.querySelector(".dice-roller");
createButtons(20)
createButtons(6)

function createCombatDice(){
    createButtons(6)
}
function createButtons(diceType){
    const div = document.createElement("div");
    div.classList.add("dice-roller__container");
    diceRoller.appendChild(div);
    for(let i = 1; i <= 6; i++){
        const button = document.createElement("button");
        button.textContent = `${i} d${diceType}`;
        button.addEventListener("click",() => {
            rollDice(diceType, i);
        })
        div.appendChild(button);
    }
    
}

function rollDice(diceType, diceAmount) {
    for (let i = 0; i < diceAmount; i++) {
        const die = Math.floor(Math.random() * diceType) + 1;
        console.log(die);
    }
}