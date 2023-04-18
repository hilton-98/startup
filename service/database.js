const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const userCollection = client.db('runway').collection('user');
const schoolCollection = client.db('runway').collection('schools');


async function getUser(username) {
    return userCollection.findOne({ username: username });
}
  
async function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function createUser(username, password) {
    // Hash the password before we insert it into the database
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = {
      username: username,
      password: passwordHash,
      token: uuid.v4(),
    };
    await userCollection.insertOne(user);
  
    return user;
  }

async function getEvents(username) {

    const schools = await getSchools(username);
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

function isDefined(obj) {
    return (obj && (obj !== "undefined"));
}

function areEventsDifferent(e1, e2) {

    if (e1.schoolName !== e2.schoolName) {
        return true;
    } else if (e1.username !== e2.username) {
        return true;
    } else if (e1.name !== e2.name) {
        return true;
    } else if (e1.date !== e2.date) {
        return true;
    } else {
        return false;
    }
}

async function updateSchools(schools, username) {

    const dbSchools = await getSchools(username);

    const schoolsArray = Object.entries(schools);
    const dbSchoolsArray = Object.entries(dbSchools);

    for (const [dbSchoolName, dbSchool] of dbSchoolsArray) {
        if (!isDefined(schools[dbSchoolName])) {
            deleteSchool(dbSchool, username);
        }
    }

    for (const [schoolName, school] of schoolsArray) {

        const dbSchool = dbSchools[schoolName];

        if (!isDefined(dbSchool)) {
            schoolCollection.insertOne(school);
            continue;
        }

        const numEvents = school.events.length;
        const numDbEvents = dbSchool.events.length;

        if (numEvents !== numDbEvents) {
            schoolCollection.findOneAndReplace({ schoolName: schoolName, username: username }, school);
            continue;
        }

        for (let i = 0; i < numEvents; i++) {

            const schoolEvent = school.events[i];
            const dbSchoolEvent = dbSchool.events[i];

            if (areEventsDifferent(schoolEvent, dbSchoolEvent)) {
                schoolCollection.findOneAndReplace({ schoolName: schoolName, username: username }, school);
                continue;
            }            
        }
    }
}

async function deleteSchool(school, username) {
    schoolCollection.deleteOne({ schoolName: school.schoolName, username: username });
}

function arrayToMap(schoolsArray) {

    let schools = {};
    for (const school of schoolsArray) {
        schools[school.schoolName] = school;
    }

    return schools;
}

async function getSchools(username) {

    const query = {username: username};
    const options = {};
    const cursor = schoolCollection.find(query, options);
    const schoolsArray = await cursor.toArray();

    return arrayToMap(schoolsArray);
}

module.exports = { getUser, getUserByToken, createUser, getSchools, getEvents, updateSchools, deleteSchool};