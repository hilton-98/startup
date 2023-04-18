import { addHeader } from "./components/header.js";
import { addSidebar } from "./components/sidebar.js";
import { addFooter } from "./components/footer.js";
import ClientStorage from "../src/clientStorage.js";
import ServerInterface from "../src/serverInterface.js";
import WebSocketInterface from "../src/webSocketInterface.js";

const COLS_PER_ROW = 3;

const bodyEl = document.querySelector('body');
const headerEl = bodyEl.querySelector('header');
const mainEl = bodyEl.querySelector('main');
const contentEl = mainEl.querySelector('.content');
const loginEl = mainEl.querySelector('.login');
const sidebarEl = mainEl.querySelector('.sidebar');
const footerEl = bodyEl.querySelector('footer');
const mySchoolsTblBodyEl = document.getElementById('my-schools-table-body');
const messagesTblBodyEl = document.getElementById('messages-table-body');

const loginBtnEl = document.getElementById('login-btn');
const createAccountBtnEl = document.getElementById('create-account-btn');
const usernameEl = document.getElementById('username-input');
const passwordEl = document.getElementById('password-input');
const errorMsgEl = document.getElementById('error-msg');

let userInfoEl = null;
let usernameDisplayEl = null;
let logoutBtnEl = null;


async function renderSchools() {
    
    const schools = await loadSchools();

    mySchoolsTblBodyEl.innerHTML = "";

    let rowCounter = 0;

    let tblRowEl = document.createElement('tr');

    for (const [schoolName, school] of Object.entries(schools)) {

        const tblDataEl = document.createElement('td');
        const schoolBodyEl = document.createElement('div');
        schoolBodyEl.className = "school-body";
        
        const schoolNameHeaderEl = document.createElement('h5');
        schoolNameHeaderEl.className = "school-name";
        schoolNameHeaderEl.textContent = schoolName;

        const schoolTextContainerEl = document.createElement('div');
        schoolTextContainerEl.className = "school-text-container";

        const removeBtnEl = document.createElement('span');
        removeBtnEl.className = "homepage-btn";
        removeBtnEl.textContent = "Remove";
        removeBtnEl.addEventListener('click', () => handleRemoveSchool(school));

        schoolTextContainerEl.innerHTML += 
            "<p class=\"school-text\">Next Up: " + school.events[0].name + "</p>" +
            "<p class=\"school-text\">On: " + school.events[0].date + "</p>";

        schoolBodyEl.append(schoolNameHeaderEl, schoolTextContainerEl, removeBtnEl);
        tblDataEl.appendChild(schoolBodyEl);
        tblRowEl.appendChild(tblDataEl);

        rowCounter++;

        if (rowCounter >= COLS_PER_ROW) {
            rowCounter = 0;
            mySchoolsTblBodyEl.append(tblRowEl);
            tblRowEl = document.createElement('tr');
        }
    }

    mySchoolsTblBodyEl.append(tblRowEl);
}


function renderMessages() {

    const messages = ClientStorage.getMessages();

    messagesTblBodyEl.innerHTML = "";

    for (const message of messages) {

        const tblRowEl = document.createElement('tr');
        const tblDataEl = document.createElement('td');
        tblDataEl.textContent = message;

        tblRowEl.appendChild(tblDataEl);
        messagesTblBodyEl.appendChild(tblRowEl);
    }

}

async function removeSchool(school) {

    const schools = await ServerInterface.removeSchool(school);

    if (schools) {
        ClientStorage.setSchools(schools);
    } else {
        ClientStorage.removeSchool(school.schoolName);
    }
}

async function handleRemoveSchool(school) {

    await removeSchool(school);
    renderSchools();
}

function isValidUsernameAndPassword() {
    return (usernameEl.value !== '' && passwordEl.value !== '');

}
async function handleLogin() {

    if (!isValidUsernameAndPassword()) {
        return;
    }

    await login(usernameEl.value, passwordEl.value);
    WebSocketInterface.init();
}

async function handleCreateAccount() {

    if (!isValidUsernameAndPassword()) {
        return;
    }

    await createUser(usernameEl.value, passwordEl.value);
}

async function loadSchools() {

    const serverSchools = await ServerInterface.getSchools();
    
    if (serverSchools) {
        return serverSchools;
    } else {
        return ClientStorage.getSchools();
    }
}

function init() {
    WebSocketInterface.configureWebSocket();
    addHeader(headerEl);
    addSidebar(sidebarEl, "Home");
    addFooter(footerEl);

    usernameDisplayEl = document.getElementById('username-display');
    logoutBtnEl = document.getElementById('logout-btn');
    userInfoEl = document.getElementById('user-info');
}

function initLoggedIn() {

    init();
    loginDisplay();
    renderSchools();
    renderMessages();
}

function initLoggedOut() {

    init();
    logoutDisplay();
}

async function createUser(username, password) {
    const response = await ServerInterface.createUser(username, password);
    loginOrCreate(username, response);}

async function login(username, password) {
    const response = await ServerInterface.login(username, password);
    loginOrCreate(username, response);
}

function loginOrCreate(username, response) {

    if (response?.status === 200) {
        ClientStorage.setUsername(username);
        usernameDisplayEl.textContent = username;

        loginDisplay();
        renderSchools();
        renderMessages();
    } else {
        errorMsgEl.textContent = `⚠ Error: ${response.obj.msg}`;
    }
}

function logoutDisplay() {

    loginEl.hidden = false;
    contentEl.hidden = true;
    sidebarEl.hidden = true;
    userInfoEl.hidden = true;

    loginBtnEl.addEventListener('click', handleLogin);
    createAccountBtnEl.addEventListener('click', handleCreateAccount);
}

function loginDisplay() {
    loginEl.hidden = true;
    contentEl.hidden = false;
    sidebarEl.hidden = false;          
    userInfoEl.hidden = false;
}



if (ClientStorage.getUsername() !== '') {
    initLoggedIn();
} else {
    initLoggedOut();
}
