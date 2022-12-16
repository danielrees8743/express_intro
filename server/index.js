const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const charactersRouter = require('./routes/characters.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//* Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(colors.yellow.italic(req.path, req.method));

  next();
});
app.use('/', charactersRouter);

app.listen(PORT, () => {
  console.log(colors.cyan.italic(`Server is running on port ${PORT}`));
});
