// pages.routes.js
const express = require('express');
const router = express.Router();

const API_KEY = process.env.API_KEY;

//GET Home de la app formulario
router.get('/', (req, res) => {
  res.render('home');
});

//POST Recibe el title de la peli y redirige a /film/:title
router.post('/film', (req, res) => {
  const title = req.body.title;
  if (!title) {
    return res.redirect('/');
  }
  res.redirect(`/film/${encodeURIComponent(title)}`);
});

//GET Muestra datos de una peli por nombre
router.get('/film/:title', async (req, res) => {
  const title = req.params.title;

  try {
    const url = `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'False') {
      return res.status(404).render('film', { error: 'Movie not found' });
    }

    res.render('film', {
      title: data.Title,
      director: data.Director,
      year: data.Year,
      plot: data.Plot,
      poster: data.Poster
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('film', { error: 'Error' });
  }
});

module.exports = router;