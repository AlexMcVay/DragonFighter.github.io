//Learned from freeCodeCamp.org - https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/dragon-repeller
//Variables
let xp = 0;
let health = 100;
let gold = 50;
let currentWeaponIndex = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
//DOM
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
    {name:"stick", power:5},
    {name:"dagger", power:30},
    {name:"claw hammer", power:50},
    {name:"sword", power:100}
];
const monsters=[
    {
      name:"slime", 
      level:2, 
      health:15
    },
    {
      name:"fanged beast", 
      level:8, 
      health:60
    },
    {
      name:"dragon", 
      level:20, 
      health:300
    }
]
const locations = [
    {
      name: "town square",
      "button text": ["Go to store", "Go to cave", "Fight dragon"],
      "button functions": [goStore, goCave, fightDragon],
        text:"You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name:"store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon,goTown],
        text:"You enter the store."
      },
    {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
    },
    {
      name: "fight",
      "button text": ["Attack", "Dodge", "Run"],
      "button functions": [attack, dodge, goTown],
      text: "You are fighting a monster."
    },
    {
      name: "kill monster",
      "button text": ["Go to town square", "Go to town square", "Go to town square"],
      "button functions": [goTown, goTown, goTown],
      text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
      }
    }
    if (Math.random() <= .1&& inventory.length !== 1) {
      text.innerText += " Your " + inventory.pop() + " breaks.";
      currentWeaponIndex--;
    }
  }

/**
 * Calculates the attack value of a monster based on its level and the player's XP.
 * @param {number} level - The level of the monster.
 * @returns {number} The attack value of the monster, or 0 if the attack is dodged.
 */
  function getMonsterAttackValue(level) {
    const hit =(level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit>0 ? hit : 0;
  }


/**
 * Returns true if the current monster hits the player, false if the player dodges.
 * The monster has a 20% chance to hit, or 100% if the player's health is less than 20.
 * @returns {boolean}
 */
  function isMonsterHit() {
    return Math.random() > .2|| health < 20;
  }


/**
 * Updates the game text to reflect the dodge action from the current monster.
 */
  function dodge(){
    if (randomNumber(1,xp) === 1) {
      text.innerText = "You do not dodge the attack from the " + monsters[fighting].name + ".";
    }else{
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";}
  }

/**
 * Updates the game state after defeating a monster.
 * Increases the player's gold based on the monster's level and updates the gold display.
 * Increases the player's experience points (XP) by the monster's level and updates the XP display.
 * Transitions the game to the "kill monster" location, which reflects the defeated monster's state.
 */
  function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    goldText.innerText = gold;
    xp += monsters[fighting].level;
    xpText.innerText = xp;
    update(locations[4]);
  }

/**
 * Updates the game state to reflect a loss.
 * Displays the losing message and sets up the UI for replay options.
 */
  function lose(){
    update(locations[5]);
  }

/**
 * Updates the game state to reflect a win.
 * Displays the winning message and sets up the UI for replay options.
 */

  function winGame(){
    update(locations[6]);
  }

/**
 * Resets the player's stats and inventory to their initial values.
 * Sets XP to 0, gold to 50, and health to 100. Resets the current weapon
 * index to the starting weapon and clears the inventory to contain only the 
 * initial weapon. Updates the UI to reflect these changes and moves the 
 * player to the town square.
 */
  function restart(){
    xp = 0;
    xpText.innerText = xp;
    gold = 50;
    goldText.innerText = gold;
    health = 100;
    healthText.innerText = health;
    currentWeaponIndex = 0;
    inventory = ["stick"];
    goTown();
  }

/**
 * Updates the UI to play an Easter egg game.
 * The user is given a prompt to pick a number between 0 and 10.
 * If the number chosen matches one of the randomly chosen numbers, the user wins.
 * @function
 */
  function easterEgg(){
    update(locations[7]);
  }

/**
 * Runs an Easter egg game. The user is given a prompt to pick a number between 0 and 10.
 * If the number chosen matches one of the randomly chosen numbers, the user wins.
 * @function
 */
  function pickTwo(){
    pick(2);
  }

/**
 * Runs the Easter egg game, guessing the number 8.
 */
  function pickEight(){
    pick(8);
  }
  
/**
 * Runs an Easter egg game. The user is given a prompt to pick a number between 0 and 10.
 * The game then generates 10 random numbers between 0 and 10. If the user's number is included in the set of numbers, the user wins 20 gold.
 * Otherwise the user loses 10 health.
 * @param {number} guess The number chosen by the user.
 */
  function pick(guess){
    const numbers = [];
    while (numbers.length < 10) {
      numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "You picked " + guess +". Here are the random numbers:\n";
    for (let i = 0; i < numbers.length; i++) {
      text.innerText += numbers[i] + "\n";
    }
    if (numbers.includes(guess)) {
      text.innerText += "Right! You win 20 gold!";
      gold += 20;
      goldText.innerText = gold;
    }
    else {
      text.innerText += "Wrong! You lose 10 health!";
      health -= 10;
      healthText.innerText = health;
      if (health <= 0) {
        lose();
      }
    }
  }
