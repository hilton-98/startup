const express = require('express');
const app = express();
const DB = require('./database.js');

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetSchools
apiRouter.get('/schools', async (_req, res) => {
    res.send(await DB.getSchools());
  });
  
// GetEvents
apiRouter.get('/events', async (_req, res) => {
    res.send(await DB.getEvents());
});

// Delete school
apiRouter.post('/schools/delete', async (req, res) => {
    await DB.deleteSchool(req.body);
    res.send(await DB.getSchools());
});

// Update schools
apiRouter.post('/schools/update', async (req, res) => {
    await DB.updateSchools(req.body);
    res.send(await DB.getSchools());
});


// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });