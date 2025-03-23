// Part One: Humble Beginnings
const adventurer = {
  name: "Robin",
  health: 10,
  inventory: ["sword", "potion", "artifact"],
};

// loop practice

for (let item of adventurer.inventory) {
  console.log(item);
}

adventurer.companion = {
  name: "Leo",
  type: "Cat",
};

adventurer.companion.companion = {
  name: "Frank",
  type: "Flea",
  inventory: ["small hat", "sunglasses"],
};

console.log(adventurer);

adventurer.roll = function (mod = 0) {
  const result = Math.floor(Math.random() * 20) + 1 + mod;
  console.log(`${this.name} rolled a ${result}.`);
};

adventurer.roll();

// Part Two: Class Fantasy

class Character {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.inventory = [];
  }
  // Part 4 addition
  static MAX_HEALTH = 100;
}

Character.prototype.roll = function (mod = 0) {
  const result = Math.floor(Math.random() * 20) + 1 + mod;
  console.log(`${this.name} rolled a ${result}.`);
  return result;
};

let robin = new Character("Robin");
robin.inventory = ["sword", "potion", "artifact"];
robin.companion = new Character("Leo");
robin.companion.type = "Cat";
robin.companion.companion = new Character("Frank");
robin.companion.companion.type = "Flea";
robin.companion.companion.inventory = ["small hat", "sunglasses"];

robin.roll();

// Part Three: Class Features

class Adventurer extends Character {
  constructor(name, role) {
    super(name);
    // Part 4 addition
    if (!Adventurer.ROLES.includes(role)) {
      throw new Error(`Invalid role: ${role} does not exist.`);
    }
    // Adventurers have specialized roles.
    this.role = role;
    // Every adventurer starts with a bed and 50 gold coins.
    this.inventory.push("bedroll", "50 gold coins");
  }
  // Part 4 Addition
  static ROLES = ["Fighter", "Healer", "Wizard", "Brave Sir Knight"];
  // Adventurers have the ability to scout ahead of them.
  scout() {
    console.log(`${this.name} is scouting ahead...`);
    super.roll();
  }

  // Adventures need to eat
  eat(food) {
    console.log(`${this.name} eats ${food}...`);
    super.roll();
  }
}

class Companion extends Character {
  constructor(name, boss, type, battlecry) {
    super(name);
    this.type = type;
    this.boss = boss;
    this.battlecry = battlecry;
  }

  grovels() {
    console.log(`${this.name} grovels at ${this.boss.name}'s feet!`);
  }

  battleCall() {
    console.log(
      `${this.name} initiates a call to battle, '${this.battlecry}'!`
    );
  }
}

robin = new Adventurer("Robin", "Brave Sir Knight");
const boo = new Companion(
  "Boo",
  robin,
  "Miniature Giant Space Hamster",
  "squeak!"
);

boo.grovels();
boo.battleCall();

// Part Four: Class Uniforms

console.log("Part 4 static additions added at class definitions");

// Part Five: Gather Your Party

class AdventurerFactory {
  constructor(role) {
    this.role = role;
    this.adventurers = [];
  }
  generate(name) {
    const newAdventurer = new Adventurer(name, this.role);
    this.adventurers.push(newAdventurer);
  }
  findByIndex(index) {
    return this.adventurers[index];
  }
  findByName(name) {
    return this.adventurers.find((a) => a.name === name);
  }
}

const healers = new AdventurerFactory("Healer");
const robin2 = healers.generate("Robin");

// Part Six: Developing Skills
Adventurer.prototype.duel = function (Adventurer) {
  let winner;
  while (this.health > 50 && Adventurer.health > 50) {
    let charRoll = this.roll();
    let opposedRoll = Adventurer.roll();
    if (charRoll < opposedRoll) {
      this.health -= 1;
      console.log(
        `${this.name} has been injured! ${this.name}: ${this.health}hp, ${Adventurer.name}: ${Adventurer.health}hp`
      );
    } else if (opposedRoll < charRoll) {
      Adventurer.health -= 1;
      console.log(
        `${Adventurer.name} has been injured! ${this.name}: ${this.health}hp, ${Adventurer.name}: ${Adventurer.health}hp`
      );
    } else {
      console.log(`No Shots have landed this round`);
    }

    if (this.health <= 50) winner = Adventurer.name;
    if (Adventurer.health <= 50) winner = this.name;
  }

  console.log(`${winner} has won the duel!`);
};

const brad = new Adventurer("Brad", "Healer");
const george = new Adventurer("George", "Fighter");

brad.duel(george);

// Part Seven

class Dragon extends Character {
  constructor(name, element) {
    super(name);
    this.element = element;
  }

  breathe(target) {
    console.log(
      `${this.name} breathes ${this.element} at ${target.name}, dealing 20 damage!`
    );
    target.health -= 20;
  }
}

const puff = new Dragon("Puff", "rainbow smoke");
const fred = new Adventurer("Fred", "Wizard");

puff.breathe(fred);
console.log(`${fred.name}'s health is now ${fred.health}`);
