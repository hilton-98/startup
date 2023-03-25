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
 ```var apiRouter = express.Router();
  app.use(`/api`, apiRouter); -> this gives a base url for our api.
