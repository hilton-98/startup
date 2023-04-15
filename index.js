const express = require('express');
const app = express();


let schools = {};

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetSchools
apiRouter.get('/schools', (_req, res) => {
    res.send(schools);
  });
  
// GetEvents
apiRouter.post('/events', (req, res) => {
    res.get(events);
});

// Delete school
apiRouter.post('/schools/delete', (req, res) => {
    deleteSchool(req.body);
    res.send(schools);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

// Update schools
apiRouter.post('/schools/update', (req, res) => {
    updateSchools(req.body, schools);
    res.send(schools);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });