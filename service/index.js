const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const { PeerProxy } = require('./peerProxy.js');


const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 3000;

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
}

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
    
    if (await DB.getUser(req.body.username)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await DB.createUser(req.body.username, req.body.password);
  
      // Set the cookie
      setAuthCookie(res, user.token);
  
      res.send({
        id: user._id,
      });
    }
  });

apiRouter.post('/auth/login', async (req, res) => {

    const user = await DB.getUser(req.body.username);

    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        setAuthCookie(res, user.token);
        res.send({ id: user._id });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', (__req, res) => {

    res.clearCookie(authCookieName);
    res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:username', async (req, res) => {
    const user = await DB.getUser(req.params.username);
    if (user) {
      const token = req?.cookies.token;
      res.send({ username: user.username, authenticated: token === user.token });
      return;
    }
    res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);


secureApiRouter.use(async (req, res, next) => {
    authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
        req.user = user;
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
});

// GetSchools
secureApiRouter.get('/schools', async (req, res) => {
    res.send(await DB.getSchools(req.user.username));
  });
  
// GetEvents
secureApiRouter.get('/events', async (req, res) => {
    res.send(await DB.getEvents(req.user.username));
});

secureApiRouter.post('/schools/update', async (req, res) => {
    await DB.updateSchools(req.body, req.user.username);
    res.send(await DB.getSchools(req.user.username));
});

// Delete school
secureApiRouter.post('/schools/delete', async (req, res) => {
    await DB.deleteSchool(req.body, req.user.username);
    res.send(await DB.getSchools(req.user.username));
});

// Default error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});
  
// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

new PeerProxy(httpService);
