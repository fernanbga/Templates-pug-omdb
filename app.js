const express = require('express');
const cowsay = require('cowsay');
const path = require('path');
require('dotenv').config();

const app = express()
const port = process.env.PORT || 3000;


//PUGLIFE
app.set('view engine', 'pug');
app.set('views', './views');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Rutas
const pageRoutes = require('./routes/pages.routes');
app.use('/', pageRoutes);

//cowsay
app.listen(port, () => {
  console.log(
    cowsay.say({
      text: `Example app listening on port http://localhost:${port}`,
      f: "nyan", // Use the tux ASCII art // tux
    })
  );
});