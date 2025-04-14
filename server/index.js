const express = require('express');
const path = require('path');


const {
  serveHeroes,
  serveHero,
  createHero,
  updateHero,
  deleteHero
} = require('./controllers/heroControllers'); 

const app = express();
const pathToFrontendDist = path.join(__dirname, '../frontend/dist');

////////////////////////
// Middleware
////////////////////////

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  req.time = time;
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

app.use(logRoutes);
app.use(express.static(pathToFrontendDist));
app.use(express.json());

////////////////////////
// Endpoints (Heroes!)
////////////////////////

// All routes now use `/api/heroes` instead of `/api/fellows`
app.get('/api/heroes', serveHeroes);
app.get('/api/heroes/:id', serveHero);
app.post('/api/heroes', createHero);
app.patch('/api/heroes/:id', updateHero);
app.delete('/api/heroes/:id', deleteHero);


app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) return next();
  res.sendFile(pathToFrontendDist);
});

const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
