let xp = 0;
let health = 10;
let level = 1;
let gold = 50;
let enemyHealth;
let currentWeapon = 0;
let inventory = ['wooden sword'];

const xpText = document.querySelector('#xp-text');
const healthText = document.querySelector('#health-text');
const levelText = document.querySelector('#level-text');
const goldText = document.querySelector('#gold-text');
const option1 = document.querySelector('#option-1');
const option2 = document.querySelector('#option-2');
const option3 = document.querySelector('#option-3');

const enemyHealthText = document.querySelector('#enemy-health');
const enemyName = document.querySelector('#enemy-name');
const enemyStats = document.querySelector('#enemy-stats');
const text = document.querySelector('#game-text');

const weapons = [
    { name: 'wooden sword', attack: 1 },
    { name: 'sharpened spear', attack: 5 },
    { name: 'dagger', attack: 10 },
    { name: 'shortsword', attack: 20 },
    { name: 'greatax', attack: 30 },
    { name: 'holy sword', attack: 500 },
];

const enemies = [
    { name: 'Slime', health: 5, level: 1 },
    { name: 'Imp', health: 10, level: 2 },
    { name: 'Goblin', health: 15, level: 5 },
    { name: 'Ghost', health: 1, level: 10 },
    { name: 'Ogre', health: 50, level: 10 },
    { name: 'Devil', health: 1000, level: 20 },
    { name: 'Guard', health: 170, level: 14 },
];

const locations = [
    {
    name: 'town',
    'button text': ['Walk forward', 'Investigate', 'Fight'], 
    'button function': [cave, blacksmith, fightGuard], 
text: 'You walk into town after being gifted the wooden sword from an old man camped outside of town. You can walk out the other side of town, investigate the town further or attack the guard looking at you with disgust'
    },
    {
        name: 'cave', 
        'button text': ['Walk forward', 'Investigate', 'Fight'], 
        'button function': [castle, field, fightSlime], 
        text: 'You walk into a damp cave. It appears to lead toward a large castle in the distance. You see sunlight pouring from a small entrance to your right that you can investigate. A sound from the darkness is coming closer to you. Will you fight?'
    },
    {
        name: 'field', 
        'button text': ['Walk forward', 'Investigate', 'Fight'], 
        'button function': [castle, fightImp, fightGoblin], 
        text: 'You walk into the field, wildflowers tickling your legs. An ugly green creature is rolling around in the flowers. The castle lays directly ahead of you. A hold in the ground large enough for you to fit in is just to your right.'
    },
    {
        name: 'castle', 
        'button text': ['Walk forward', 'Investigate', 'Fight'], 
        'button function': [field, fightGhost, fightOgre], 
        text: 'You walk into the castle and see a large door, slight opened. A side door seems to lead toward light. A loud crashing sound is coming from a stairway across from you.'
    },
    {
        name: 'hell', 
        'button text': ['Walk forward', 'Investigate', 'Fight'], 
        'button functon': [lose, lose, fightDevil], 
        text: 'You walk through the large doors and everything turns black. You feel heat coming from all sides and a flash of light reveals a small, horned, winged creature smiling at you. You realize you have stumbled upon the devil itself.'
    },
    {
        name: 'merchant', 
        'button text': ['Purchase weapon', 'Purchase potion', 'Leave'], 
        'button function': [buyWeapon, buyPotion, town], 
        text: 'You walk into the merchant shop. The sound of pounding metal and the heat greet you before he does. Aye sir! What can I do for ya today?'
    },
    {
        name: 'fight', 
        'button text': ['Attack', 'Dodge', 'Parry'], 
        'button function': [attackPower, dodge, parryPower], 
        text: 'You come upon an enemy and you begin to fight!'
    },
    {
        name: 'kill enemy', 
        'button text': ['Go to town', 'Go to town', 'Go to town'], 
        'button function': [town, town, town], 
        text: 'Congratulations! You slayed the enemy!'
    },
    {
        name: 'lose', 
        'button text': ['Retry', 'RETRY', 'retry'], 
        'button function': [replay, replay, replay],
        text: 'The enemy has slain you in battle. Retry?'
    },
    {
        name: 'win', 
        'button text': ['Retry', 'RETRY', 'retry'], 
        'button function': [replay, replay, easterEgg], 
        text: 'Congratulations! You have beaten the game! Retry?'
    },
    {
        name: 'secret', 
        'button text': ['door1', 'door2', 'door3'], 
        'button function': [fightDevil, lose, win], 
        text: 'Congratulations! You found the secret room! Where will you go next?'
    }
    
]

option1.onclick = cave;
option2.onclick = blacksmith;
option3.onclick = fightGuard;

function update(location) {
    option1.innerText = location['button text'][0];
    option2.innerText = location['button text'][1];
    option3.innerText = location['button text'][2];
    option1.onclick = location['button function'][0];
    option2.onclick = location['button function'][1];
    option3.onclick = location['button function'][2];
    text.innerText = location.text
}

function initializeGame() {
    xpText.innerText = xp;
    healthText.innerText = health;
    levelText.innerText = level;
    goldText.innerText = gold;
    enemyStats.style.display = 'none'
}

window.onload = function () {
    initializeGame()
    town()
}

function levelUp () {
    if (xp >= 10) {
        level++;
        text.innerText = 'Congratulations you leveled up! You are now Level ' + level + '!'
        xp = 0
        levelText.innerText = level
    }
}

function town () {
    update(locations[0])
}

function cave () {
    update(locations[1])
    
}

function field () {
    update(locations[2])
}

function castle () {
    update(locations[3])
}

function hell () {
    update(locations[4])
}

function blacksmith () {
    update(locations[5])
}

function buyPotion () {if (gold >= 5) {
    gold -= 5;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    
}
else {
    text.innerText = 'Sorry, but you do not have enough gold to purchase potions.'
}
}

function buyWeapon () {if (gold >= 10) {
    gold -= 10;
    goldText.innerText = gold;
    currentWeapon++;
    let newWeapon = weapons[currentWeapon].name;
    text.innerText = 'Congratulations. You have purchased a ' + newWeapon + ' ! ';
    inventory.push(newWeapon); }
    else {
        text.innerText = 'You do not have enough gold to purchase the blacksmith`s` goods.'
    }
}


function fightSlime () {
    fight = 0
    theFight(fight)
}

function fightImp () {
    fight = 1
    theFight(fight)
}
function fightGoblin () {
    fight = 2
    theFight(fight)
}
function fightGhost () {
    fight = 3
    theFight(fight)
}
function fightOgre () {
    fight = 4
    theFight(fight)
}
function fightDevil () {
    fight = 5
    theFight(fight)
}
function fightGuard () {
    fight = 6
    theFight(fight)
}

function theFight(fight) {
    console.log(enemies[fight])
    update(locations[6]);
    enemyStats.style.display = 'block'
    enemyHealth = enemies[fight].health;
    enemyName.innerText = enemies[fight].name;
    enemyHealthText.innerText = enemyHealth;
    

}

function attackPower() {
    text.innerText = 'The ' + enemies[fight].name + ' attacks you!';
    text.innerText += 'You attack the ' + enemies[fight].name + ' with your ' + weapons[currentWeapon].name + ' . ';
    health -= enemyAttackValue(enemies[fight].level)
    if (attackChance() > .5) {
        const damage = weapons[currentWeapon].attack + (Math.floor(Math.random()) * level);
        enemyHealth -= damage 
    }
    else {
        text.innerText = 'Your attack just misses.'
    }
    
    healthText.innerText = health;
    enemyHealthText.innerText = enemyHealth;

    if (health <= 0) {
        lose();

    }
    else if (enemyHealth <= 0) {
        if (fight === 6) {
            win();
        }
        else {
            defeatEnemy()
            

            
        }

    }
}

function enemyAttackValue (level) {
    const hit = (level * 2) - (Math.floor(Math.random()))
    return hit > 0 ? hit : 0
}

function parryPower () {
    if (Math.random() >= .5) {
        const damage = weapons[currentWeapon].attack + (Math.floor(Math.random()) * level);
        text.innerText = 'You parry the attack, inflicting ' + damage + ' damage on the ' + enemies[fight].name + ' ! '
        enemyHealth -= damage
        
    }
    else {
        const enemyHit = enemyAttackValue(enemies[fight].level);
        text.innerText = 'You fail to parry and the ' + enemies[fight].name + ' strikes you.'
        health -= enemyHit;
    }

    healthText.innerText = health;
    enemyHealthText.innerText = enemyHealth;

    if (health <= 0) {
        lose();
    } else if (enemyHealth <= 0) {
        if (fight === 6) {
            win();
        } else {
            defeatEnemy();
        }
    }
}





function attackChance () {
    return Math.random() >= .5
}

function dodge () {
    if (Math.random() >= .66) {
        text.innerText = 'You dodge the attack from the ' + enemies[fight].name + ' The ' + enemies[fight].name + ' falls to the ground, colliding with a wall nearby!';
        const damage = weapons[currentWeapon].attack + (Math.floor(Math.random()) * 5)
        enemyHealth -= damage
    }
    else {
        const enemyHit = enemyAttackValue(enemies[fight].level);
        text.innerText = 'You fail to parry and the ' + enemies[fight].name + ' strikes you.'
        health -= enemyHit;
    }
    healthText.innerText = health;
    enemyHealthText.innerText = enemyHealth;

    if (health <= 0) {
        lose();
    } else if (enemyHealth <= 0) {
        if (fight === 6) {
            win();
        } else {
            defeatEnemy();
        }
    }
}

function defeatEnemy() {
    gold += Math.floor(Math.random() * enemies[fight].level) + 5;
    xp += (Math.floor(Math.random() + enemies[fight].level));
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[7]);
    enemyStats.style.display = 'none';
    
}

function lose () {
    console.log('Entering lose function');
    const loseLocation = {
        name: 'lose',
        'button text': ['Retry', 'RETRY', 'retry'],
        'button function': [replay, replay, easterEgg],
        text: 'The enemy has slain you in battle. Retry?'
    };
    console.log('Calling update function with loseLocation');
    update(loseLocation);
}

function win () {
    update(locations[9])
    initializeGame()
}

function easterEgg () {
    update(locations[10])
    
}

function replay() {
    xp = 0;
    health = 10;
    level = 1;
    gold = 50;
    inventory = ['wooden sword'];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    enemyStats.style.display = 'none';
    town();
}
