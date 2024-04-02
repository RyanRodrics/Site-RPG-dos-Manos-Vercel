let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["galho"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#textgame");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'galho', power: 5 },
  { name: 'adaga', power: 30 },
  { name: 'machadinha', power: 50 },
  { name: 'espada', power: 100 }
];
const monsters = [
  {
    name: "Slime",
    level: 2,
    health: 15
  },
  {
    name: "Fanged Beast",
    level: 8,
    health: 60
  },
  {
    name: "Dragão",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Ir para a loja", "Ir para a caverna", "Lutar com o Dragão"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Você está na praça da vila. Você vê uma placa que diz \"Loja\"."
  },
  {
    name: "store",
    "button text": ["Comprar 10 de Vida (10 gold)", "Comprar arma (30 gold)", "Ir para a praça da Vila"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Você entra na loja."
  },
  {
    name: "cave",
    "button text": ["Lutar com Slime", "Lutar com Fanged Beast", "Ir para a praça da Vila"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Você entra na caverna e vê alguns monstros."
  },
  {
    name: "fight",
    "button text": ["Ataque", "Esquiva", "Fugir"],
    "button functions": [attack, dodge, goTown],
    text: "Você está lutando com um monstro."
  },
  {
    name: "kill monster",
    "button text": ["Ir para a praça da Vila", "Ir para a praça da Vila", "Ir para a praça da Vila"],
    "button functions": [goTown, goTown, goTown],
    text: 'O monstro grita "Arg!" e morre. Voçê ganha pontos de experiencia e acha gold.'
  },
  {
    name: "lose",
    "button text": ["Tentar de novo?", "Tentar de novo?", "Tentar de novo?"],
    "button functions": [restart, restart, restart],
    text: "Voçê morreu. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["Tentar de novo?", "Tentar de novo?", "Tentar de novo?"], 
    "button functions": [restart, restart, restart], 
    text: "Voçê derrotou o Dragão! VOÇÊ GANHOU O JOGO! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Ir para a praça da Vila?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Voçê achou um jogo secreto. Escolha um número acima. Dez números serão escolhidos aleatoriamente entre 0 e 10. Se o número que voçê escolher coincidir com um dos aleatórios, vocçê ganha!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "Voçê não tem gold o bastante para comprar vida.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Voçê agora tem um(a) " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " Em seu inventário você tem: " + inventory;
    } else {
      text.innerText = "Voçê não tem gold o bastante para comprar um arma.";
    }
  } else {
    text.innerText = "Voçê já tem a arma mais poderosa!";
    button2.innerText = "Venda arma por 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Você vendeu um(a) " + currentWeapon + ".";
    text.innerText += " Em seu inventário você tem: " + inventory;
  } else {
    text.innerText = "Não venda sua única arma!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "O " + monsters[fighting].name + " ataca.";
  text.innerText += " Voçê ataca com " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " Você erra.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Sua arma " + inventory.pop() + " quebra.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "Você desvia do ataque do " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["galho"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Voçê escolhe " + guess + ". Aqui estão os números aleatórios:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Certo! Voçê ganhou 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Errado! Você perdeu 10 de vida!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}