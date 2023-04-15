const express = require('express');
const app = express();
const DB = require('./database.js');

let username = '';

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetSchools
apiRouter.get('/schools', async (_req, res) => {

    res.send(await DB.getSchools(username));
  });
  
// GetEvents
apiRouter.get('/events', async (_req, res) => {
    res.send(await DB.getEvents(username));
});

apiRouter.post('/schools/update', async (req, res) => {
    await DB.updateSchools(req.body, username);
    res.send();
});

// Delete school
apiRouter.post('/schools/delete', async (req, res) => {
    await DB.deleteSchool(req.body, username);
    res.send(await DB.getSchools(username));
});

apiRouter.post('/username', (req, res) => {
    username = req.body.username;
    res.send();
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });