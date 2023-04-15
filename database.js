const {MongoClient} = require('mongodb');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const schoolCollection = client.db('runway').collection('schools');

let schools = {};


// function addScore(score) {
//   scoreCollection.insertOne(score);
// }

// function getHighScores() {
//   const query = {score: {$gt: 0}};
//   const options = {
//     sort: {score: -1},
//     limit: 10,
//   };
//   const cursor = scoreCollection.find(query, options);
//   return cursor.toArray();
// }


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

function deleteSchool(school) {
    console.log("deleting school");

    // schoolCollection.deleteOne(school);
    delete schools[school.schoolName];
}

function getSchools(username) {

    // console.log("Get Schools");
    // const query = {};
    // const options = {};
    // const cursor = schoolCollection.find(query, options);
    // return cursor.toArray();
    return schools;
}


module.exports = { getSchools, getEvents, deleteSchool, updateSchools};