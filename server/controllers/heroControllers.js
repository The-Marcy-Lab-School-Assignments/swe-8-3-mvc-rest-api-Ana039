const Hero = require('../model/Hero');


const serveHeroes = (req, res) => {
  const heroesList = Hero.list();
  res.send(heroesList);
};


const serveHero = (req, res) => {
  const { id } = req.params;
  const hero = Hero.find(Number(id));

  if (!hero) {
    return res.status(404).json({
       message: `No hero with the id ${id}` 
      });
  }

  res.send(hero);
};

// Create a New Hero
const createHero = (req, res) => {
  const { name, power } = req.body;

  if (!name || !power) {
    return res.status(400).json({ 
      message: "Missing required fields: name and power" 
    });
  }

  const newHero = Hero.create(name, power);
  res.send(newHero);
};

// Update Hero
const updateHero = (req, res) => {
  const { name, power } = req.body;
  const { id } = req.params;

  if (name === undefined && power === undefined) {
    return res.status(400).json({ message: "At least one field (name or power) must be provided" });
  }

  const updatedHero = Hero.edit(Number(id), { name, power });

  if (!updatedHero) {
    return res.status(404).json({ message: `No hero with the id ${id}` });
  }

  res.status(200).json(updatedHero);
};

// Delete Hero
const deleteHero = (req, res) => {
  const { id } = req.params;
  const didDelete = Hero.delete(Number(id));

  if (!didDelete) {
    return res.status(404).json({ message: `No hero with the id ${id}` });
  }

  res.sendStatus(204);
};

module.exports = {
  serveHeroes,
  serveHero,
  createHero,
  updateHero,
  deleteHero
};
