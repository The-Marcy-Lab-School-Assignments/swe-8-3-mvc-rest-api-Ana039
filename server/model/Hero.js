const getId = require('../utils/getId');

const heroes = [
  { name: 'Scarlet Witch', power: 'Reality Warping', id: getId() },
  { name: 'Agatha Harkness', power: 'Dark Magic', id: getId() },
  { name: 'Doctor Doom', power: 'Genius-level intellect', id: getId() },
  { name: 'Rogue', power: 'Power Absorption', id: getId() },
  { name: 'Jean Grey', power: 'Telepathy & Telekinesis', id: getId() },
];

class Hero {
  static create(name, power) {
    const newHero = { name, power, id: getId() 

    };
    heroes.push(newHero);
    return newHero;
  }

  static list() {
    return [...heroes];
  }

  static find(id) {
    return heroes.find(hero => hero.id === id);
  }

  static edit(id, data) {
    const hero = Hero.find(id);
    if (!hero) return null;
    if (data.name) hero.name = data.name;
    if (data.power) hero.power = data.power;
    
    return hero;
  }

  static delete(id) {
    const index = heroes.findIndex(hero => hero.id === id);
    if (index < 0) return false;
    heroes.splice(index, 1);
    return true;
  }
}

module.exports = Hero;
