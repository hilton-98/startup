const APP_TITLE = "Runway";


export function addHeader(headerEl, username) {

    headerEl.className = "container-fluid";

    const titleEl = document.createElement('h1');
    titleEl.className = "text-uppercase";
    titleEl.textContent = APP_TITLE;

    const userInfoEl = document.createElement('div');
    userInfoEl.id = "user-info";
    userInfoEl.className = "user-info";

    const usernameDisplayEl = document.createElement('span');
    usernameDisplayEl.id = "username-display";
    usernameDisplayEl.className = "username-display";
    usernameDisplayEl.textContent = username;

    const logoutButtonEl = document.createElement('span');
    logoutButtonEl.id = "logout-btn";
    logoutButtonEl.className = "logout-action-btn";
    logoutButtonEl.textContent = "Logout";

    userInfoEl.append(usernameDisplayEl, logoutButtonEl);

    headerEl.append(titleEl, userInfoEl);   
}