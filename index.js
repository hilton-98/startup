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
apiRouter.get('/events', (_req, res) => {
    res.send(getEvents());
});

// Delete school
apiRouter.post('/schools/delete', (req, res) => {
    deleteSchool(req.body.schoolName);
    res.send(schools);
});

// Update schools
apiRouter.post('/schools/update', (req, res) => {
    updateSchools(req.body);
    res.send(schools);
});


// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });


function getEvents() {

    let eventsList = {};
    for (const [schoolName, school] of Object.entries(schools)) {
        for (const event of school.events) {

            if (eventsList[event.date]) {
                eventsList[event.date].push({ schoolName: schoolName, name: event.name })
            } else {
                eventsList[event.date] = [{ schoolName: schoolName, name: event.name }];
            }
        }
    }

    return eventsList;
}


function updateSchools(reqBody) {
    schools = reqBody;
}

function deleteSchool(schoolName) {
    console.log("deleting school");
    console.log("schoolName: " + schoolName);
    delete schools[schoolName];
}