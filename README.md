# CS 260 STARTUP
### GitHub Assignment
- Editing from VS Code!
- Now, editing from GitHub in the browser.
- Creating a merge conflict...
#### Notes:
> - Use Dillinger for markdown editing.
> - Practice more with GitHub.
> - Use cmd + right arrow key to go to end of line in VSCode.

## Elevator Pitch
My brother recently applied to medical school, and it was such a pain for him to keep everything organized! Every school wants different essays written, different amounts of fees paid, has different interview processes, and different deadlines for everything they want submitted! If you are only applying to one school then tracking that school's requirements might not bother you, but add a few more schools and it quickly becomes a headache! My application provides a central location for storing all the information about the application deadlines and requirements for graduate school applications.

![image](https://user-images.githubusercontent.com/60210286/215250464-3e3fc4f1-e02c-4659-8b1c-977b5e95af39.png)

### Key features:
- Secure login over HTTPS
- Ability to add different schools
- Display of activities and deadlines
- Data is persistently stored
- Ability to sort activities by category (paying fees, writing essays, scheduling interviews, etc.)
- Ability to sort activities by school.
- Ability to sort activities by timeline.
- Ability to add activities and deadlines (ideally this would web-scrape the requirements, but initially could just be a menu where the user can enter in the information.

## SIMON-HTML
- HTML won't complain if you type something wrong, it just won't do what you want it to, either.
- Some tags (like ``<main>, <div>, <span>``) seem to have not effect other than semantics for reading. 

## SIMON-CSS
- CSS works in a hierarchical manner - the style that is applied is *generally* the one that is closest to the element.
- An html element can have multiple CSS classes applied to it.
- You can save variables in ``:root {}`` using ``--my-variable``. These variables are accessed in your code using ``var(--my-variable)``. 
- ViewPort is the part of the screen that is used to render the html/css in question. vh, for example, is viewport height.
- Flex can be column or row.

## CSS-HTML
- Use ``!important`` to override higher precedence and make sure your styling gets applied. Generally not good practice, but sometimes very useful.
- Remember that ``margin`` goes outside the border, while ``padding`` goes inside.
- Caddy reads files directly from public/html. Don't put your index.html inside another folder!
- It's a total pain to get things to center vertically. Still haven't figured this out quite...
- Position: absolute is NOT absolute on the entire page, just absolute relative to it's parent.
- calc(100% - xpx) is useful for getting an element to fill up all avalable space. There is probably a better way to do this, but it works pretty well.

## SIMON-JAVASCRIPT
- Include scripts at the bottom of document if they use specific HTML elements.
- User document.createElement() and myElement.appendChild() to add elements into the HTML.
- Use localStorage to store things in the browser and have them persist between refreshes/reloading the website. Add things in key-value pairs.
- JSON.parse() and JSON.stringify() are built into JavaScript and are extremely useful for working with JSON strings.


## SIMON-SERVICE
- LocalStorage is still nice, even with a back-end in node, because you can keep stuff for when you go offline.
- Put fetches in try/catch.
- Still need to figure out how to share code files between front-end and back-end.
- next() function calls the function that's below in the file. The next one we told the app about, at least.
- middleware functions are ones that you can tell your app to use always.
- app.use(express.static("directory")) easily handles html requests for that directory.
```
  var apiRouter = express.Router();
  app.use(`/api`, apiRouter); -> this gives a base url for our api.
```
## SIMON-DB
- You can see environment variables with bash command printenv.
- $VARIABLE_NAME lets you use them in a bash script or command.
- Keep your password, username, etc. out of your code! You don't want these on github where the world can find them.
- MongoDB stores stuff as JSON objects.
- Because MongoDB doesn't use SQL, there are no joins. Also, duplicate rows are totally fine.

## SIMON-LOGIN
- You can install node packages all at once with command npm install express uuid etc.
- AuthTokens are used instead of passing user information back and forth because it's more secure.
- Cookies are used to pass authtoken info
- Store passwords as hashes, not the actual password.
- httpOnly tells the browser to not allow JavaScript running on the browser to read the cookie.
- secure requires HTTPS to be used when sending the cookie back to the server.
- sameSite will only return the cookie to the domain that generated it.
- a GetMe endpoint is common, to create credentials and login using those credentials.

## SIMON-WEB-SOCKET
- NPM install ws
- Web Sockets are secure two-way communication channels. This is a totally different architecture than the client-server interactions.
- Web Sockets are always only between two computers. So, if you have an app with a server and multiple clients, client-client communication must pass through the server.
- Use wss = new WebSocketServer({noServer: true});
- User wss.on('connection' (ws) => {};
- In the above function, you can add ws.on('someStringHere', () => {}) for other functions.
- Using setInterval(() => {}, x); runs a function every x ms.
- Checking all the connections to see if they are still active is a good idea.

## SIMON-REACT
- Run npm start to run React app.
- I need to run both the back-end service (index.js) and the front-end react app (index.jsx) for the app to run correctly.
- React allows for components to be reused (for example, we only have to define our header/footer once in react, where we had to define it for each page in straight html).
- The service needs it's own node_modules, and react needs it's own node_modules.
- Use [stateVariable, stateVariableSetterFunction] = useState(initalState) to hold state.
- Return the HTML in react. Use {} to include variables.
- Use className="" instead of class="" in react. This is because the jsx is a mix of XML and JavaScript, and class is a reserved keyword already.

## STARTUP-JAVASCRIPT
- Use JSON.stringify() to go to JSON, JSON.parse to get back to JavaScript objects.
- Use append() or appendChild() to add elements to their parents in the DOM model.
- Use for ([key, value] of Object.entries(obj)) to get an array of keys and values.
- Use arrow functions () => {} when you need to pass a callback function with a parameter.
- Think of flexbox as the linear layouts for XML files in Android Studio.
- Using addEventListener('click', someFunction) can be stacked to add multipled handler functions for a click. Pretty useful.

