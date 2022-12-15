const express = require('express');
const characters = require('../characters.json');
const colors = require('colors');

const charactersRouter = express.Router();

//* Gets all the character and filters by blood
charactersRouter.get('/characters', (req, res) => {
  const { query } = req;
  const { blood } = query;
  if (blood) {
    const filteredCharacters = characters.filter((character) =>
      character.blood.toLowerCase().includes(blood.toLowerCase())
    );
    if (!filteredCharacters.length)
      return res
        .status(404)
        .json({ message: 'No character was found, Please try another' });
    return res.status(200).json(filteredCharacters);
  }

  res.status(200).json(characters);
});

//* Get a single character by id
charactersRouter.get('/characters/:id', (req, res) => {
  const { id } = req.params;
  const character = characters.find((character) => character.id === Number(id));
  if (!character)
    return res
      .status(404)
      .json({ message: 'No character was found, Please try another' });
  res.status(200).json(character);
});

//* Gets characters on from their birth month
charactersRouter.get('/characters/birth/:month', (req, res) => {
  const { month } = req.params;
  const charactersByMonth = characters.filter((character) => {
    const characterBirthMonth =
      character.born.toLowerCase().includes(month) ||
      character.born.includes(month);
    return characterBirthMonth;
  });
  if (!charactersByMonth.length)
    return res
      .status(404)
      .json({ message: 'No character was found, Please try another' });
  res.status(200).json(charactersByMonth);
});

//* Gets the character for the Quidditch team and referees
charactersRouter.get('/characters/quidditch/match', (req, res) => {
  const groupSize = 6;
  const group_1 = [];
  const group_2 = [];
  const group_3 = [];
  const group_4 = [];
  const referee = [];

  //* Group size is six,  Teams are the players divided by four
  for (let i = 0; i <= groupSize - 1; i++) {
    group_1.push(characters[i]);
    group_2.push(characters[i + 6]);
    group_3.push(characters[i + 12]);
    group_4.push(characters[i + 18]);

    //* Referees are who are not in the team
    if (group_1.length === groupSize) {
      referee.push(characters[i + 4]);
    }
  }

  //* Two matches with two groups

  const matches = {
    match1: ['Group 1:', ...group_1, 'Group 2:', ...group_2],
    match2: ['Group 3:', ...group_3, 'Group 4:', ...group_4],
    referees: ['Referee:', ...referee],
  };

  res.status(200).json({ matches });
});

module.exports = charactersRouter;
