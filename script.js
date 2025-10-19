"use strict";

// grab the input box, button, cells, name, id, weight, height, types, special move, description of said move

const API_URL = "https://rpg-creature-api.freecodecamp.rocks/api/creature";

// Input elements
const textInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const searchForm = document.getElementById("search-form");

// Creature basic info elements
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const weightNum = document.getElementById("weight");
const heightNum = document.getElementById("height");

// Types container (will need to dynamically update the divs inside)
const types = document.getElementById("types");

// Move elements
const moveName = document.getElementById("special-name");
const moveDescription = document.getElementById("special-description");

// Stats table elements
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const clearCreatureData = () => {
  // Clear input
  // textInput.value = "";

  // Clear creature basic info
  creatureName.textContent = "";
  creatureId.textContent = "";
  weight.textContent = "";
  height.textContent = "";

  // Clear types
  types.innerHTML = "";

  // Clear special move
  moveName.textContent = "";
  moveDescription.textContent = "";

  // Clear stats
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
};

const findCreature = async (argument) => {
  // clearCreatureData();

  let trimmed = argument.trim();
  if (Number(trimmed)) {
    trimmed = Number(trimmed);
  } else {
    trimmed = trimmed.toLowerCase();
  }

  // console.log(trimmed)

  try {
    const response = await fetch(API_URL + `/${trimmed}`);
    const data = await response.json();
    // console.log(data);

    const creatureTypes = data.types;
    // console.log(pokeTypes)

    creatureName.textContent = data.name.toUpperCase();
    creatureId.textContent = `#${data.id}`;

    weightNum.textContent = `Weight: ${data.weight}`;
    heightNum.textContent = `Height: ${data.height}`;

    // types.innerHTML = "";
    // pokeTypes.forEach((type) => {
    //   types.innerHTML += `<div class="cat ${type.name}">
    //     ${type.name.toUpperCase()}
    //   </div>`;
    // });

    // this is a better method cuz apparently me method is slow and causes a flicker when loading
    //  a creature
    // this basically replaces the creature types each time a different
    // creature or id is loaded
    types.innerHTML = creatureTypes
      .map((t) => `<div class="cat ${t.name}">${t.name.toUpperCase()}</div>`)
      .join("");

    moveName.textContent = data.special.name;
    moveDescription.textContent = data.special.description;

    // Find the object in the "stats" array where name === "hp"
    const hpStat = data.stats.find((stat) => stat.name === "hp");
    hp.textContent = hpStat.base_stat;

    // Find the object in the "stats" array where name === "hp"
    const attackStat = data.stats.find((stat) => stat.name === "attack");
    attack.textContent = attackStat.base_stat;

    // Find the object in the "stats" array where name === "hp"
    const defenseStat = data.stats.find((stat) => stat.name === "defense");
    defense.textContent = defenseStat.base_stat;

    // Find the object in the "stats" array where name === "hp"
    const specialAttackStat = data.stats.find(
      (stat) => stat.name === "special-attack"
    );
    specialAttack.textContent = specialAttackStat.base_stat;

    // Find the object in the "stats" array where name === "hp"
    const specialDefenseStat = data.stats.find(
      (stat) => stat.name === "special-defense"
    );
    specialDefense.textContent = specialDefenseStat.base_stat;

    // Find the object in the "stats" array where name === "hp"
    const speedStat = data.stats.find((stat) => stat.name === "speed");
    speed.textContent = speedStat.base_stat;
  } catch (error) {
    clearCreatureData();
    alert("Creature not found");
    // console.log(error);
  }
};

searchForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the page from reloading
  findCreature(textInput.value);
});
