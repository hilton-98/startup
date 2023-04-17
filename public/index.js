import { addHeader } from "./components/header.js";
import { addSidebar } from "./components/sidebar.js";
import { addFooter } from "./components/footer.js";
import ClientStorage from "./clientStorage.js";
import ServerInterface from "./serverInterface.js";

const COLS_PER_ROW = 3;

const bodyEl = document.querySelector('body');
const headerEl = bodyEl.querySelector('header');
const mainEl = bodyEl.querySelector('main');
const contentEl = mainEl.querySelector('.content');
const loginEl = mainEl.querySelector('.login');
const sidebarEl = mainEl.querySelector('.sidebar');
const footerEl = bodyEl.querySelector('footer');
const mySchoolsTblBodyEl = document.getElementById('my-schools-table-body');


const loginBtnEl = document.getElementById('login-btn');
const createAccountBtnEl = document.getElementById('create-account-btn');
const usernameEl = document.getElementById('username-input');
const passwordEl = document.getElementById('password-input');

let userInfoEl = null;
let usernameDisplayEl = null;
let logoutBtnEl = null;

function removeSchoolLocal(schoolName) {

    const schools = ClientStorage.getSchools();
    delete schools[schoolName];
    ClientStorage.setSchools(schools);
}

async function removeSchool(school) {

    const schools = await ServerInterface.removeSchool(school);

    if (schools) {
        ClientStorage.setSchools(schools);
    } else {
        removeSchoolLocal(school.schoolName);
    }
}

async function handleRemoveSchool(school) {

    removeSchool(school);
    renderSchools();
}

async function loadSchools() {

    let schools = {};

    try {
        const response = await fetch('/api/schools');
        schools = await response.json();

        ClientStorage.setSchools(schools);
    } catch {
        schools = ClientStorage.getSchools();
    }

    return schools;
}


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

function isValidUsernameAndPassword() {
    return (usernameEl.value !== '' && passwordEl.value !== '');

}

async function handleLogin() {

    if (!isValidUsernameAndPassword()) {
        return;
    }

    await login(usernameEl.value);
}

async function handleCreateAccount() {

    if (!isValidUsernameAndPassword()) {
        return;
    }

    await login(usernameEl.value);
}

function handleLogout() {
    logout();
}

function init() {
    addHeader(headerEl);
    addSidebar(sidebarEl, "Home");
    addFooter(footerEl);
    renderSchools();


    usernameDisplayEl = document.getElementById('username-display');
    logoutBtnEl = document.getElementById('logout-btn');
    userInfoEl = document.getElementById('user-info');
}

function initLoggedIn() {

    init();

    loginEl.hidden = true;
    contentEl.hidden = false;
    sidebarEl.hidden = false;
    userInfoEl.hidden = false;

    loginBtnEl.addEventListener('click', handleLogin);
    createAccountBtnEl.addEventListener('click', handleCreateAccount);
    logoutBtnEl.addEventListener('click', handleLogout);
}

function initLoggedOut() {

    init();

    contentEl.hidden = true;
    sidebarEl.hidden = true;
    userInfoEl.hidden = true;

    loginBtnEl.addEventListener('click', handleLogin);
    createAccountBtnEl.addEventListener('click', handleCreateAccount);
    logoutBtnEl.addEventListener('click', handleLogout);
}

async function login(username) {

    loginEl.hidden = true;
    contentEl.hidden = false;
    sidebarEl.hidden = false;
    userInfoEl.hidden = false;

    ClientStorage.setUsername(username);
    usernameDisplayEl.textContent = username;

    try {

        const response = await fetch('/api/username', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ username: username }),
        });

        const res = await response.json();

    } catch(e) {
        console.log(e.message);
    }
}

function logout() {
    loginEl.hidden = false;
    contentEl.hidden = true;
    sidebarEl.hidden = true;
    userInfoEl.hidden = true;
}

if (ClientStorage.getUsername() !== '') {
    initLoggedIn();
} else {
    initLoggedOut();
}
