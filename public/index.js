import { addHeader } from "./components/header.js";
import { addSidebar } from "./components/sidebar.js";
import { addFooter } from "./components/footer.js";

const COLS_PER_ROW = 3;

const mySchoolsEl = document.getElementById('my-schools');

const schools = [ 
    { 
        name: "Brigham Young University",
        nextAction: "Take the GRE",
        new: true,
        imageURL: "https://picsum.photos/300/201",
    },
    { 
        name: "Harvard University",
        nextAction: "Study for the MCAT",
        new: false,
        imageURL: "https://picsum.photos/300/201",
    },
];

function addMySchools(schools) {
    
    mySchoolsEl.innerHTML = "";

    let rowCounter = 0;
    let firstPass = true;
    let mySchoolsHTML = '';

    for (const school of schools) {

        if (rowCounter === 0) {
            if (!firstPass) {
                mySchoolsHTML += "</div>";
            } else {
                firstPass = false;
            }
            mySchoolsHTML += "<div class=\"row\">";
        }
        
        mySchoolsHTML += 
        "<div class=\"col\">" +
            "<div class=\"card school-card\">" +
                "<img class=\"card-img-top\" src=" + school.imageURL +  "/>" +
                "<div class=\"card-body\">" +
                    "<h5 class=\"card-title school-name\">" + school.name;
                    if (school.new) {
                        mySchoolsHTML += "<span class=\"badge new-tag\">New</span>";
                    }
                    mySchoolsHTML += "</h5>" +
                    "<p class=\"card-text\">" + school.nextAction + "</p>" +
                    "<a class=\"btn btn-primary details-btn homepage-btn\">Details</a>" +
                    "<a class=\"btn btn-primary remove-btn homepage-btn\" onClick=\"\">Remove</a>" +
                "</div>" +
            "</div>" +
        "</div>";

        rowCounter++;

        if (rowCounter >= COLS_PER_ROW) {
            rowCounter = 0;
        }
    }

    console.log(JSON.stringify(mySchoolsHTML));
    mySchoolsEl.innerHTML = mySchoolsHTML;
}

const bodyEl = document.querySelector('body');
const headerEl = bodyEl.querySelector('header');
const mainEl = bodyEl.querySelector('main');
const contentEl = mainEl.querySelector('.content');
const loginEl = mainEl.querySelector('.login');
const sidebarEl = mainEl.querySelector('.sidebar');
const footerEl = bodyEl.querySelector('footer');


const loginBtnEl = document.getElementById('login-btn');
const createAccountBtnEl = document.getElementById('create-account-btn');
const usernameEl = document.getElementById('username-input');
const passwordEl = document.getElementById('password-input');

let userInfoEl = null;
let usernameDisplayEl = null;
let logoutBtnEl = null;


function isValidUsernameAndPassword() {
    return (usernameEl.value !== '' && passwordEl.value !== '');

}

function handleLogin() {
    console.log("handle login");

    console.log('username: ' + usernameEl.value);
    console.log('password: ' + passwordEl.value);


    if (!isValidUsernameAndPassword()) {
        console.log("invalid");
        return;
    }

    login(usernameEl.value);
}

function handleCreateAccount() {
    console.log("handle create account");
    if (!isValidUsernameAndPassword()) {
        console.log("invalid");
        return;
    }

    login(usernameEl.value);
}

function handleLogout() {
    console.log('handle logout');
    logout();
}

function init(username) {
    addHeader(headerEl, username);
    addSidebar(sidebarEl, "Home");
    addFooter(footerEl);

    usernameDisplayEl = document.getElementById('username-display');
    logoutBtnEl = document.getElementById('logout-btn');
    userInfoEl = document.getElementById('user-info');
}

function initLoggedIn() {

    const username = localStorage.getItem('username');

    init(username);
    // addHeader(headerEl, username);
    // addSidebar(sidebarEl, "Home");
    // addFooter(footerEl);

    // usernameDisplayEl = document.getElementById('username-display');
    // logoutBtnEl = document.getElementById('logout-btn');
    // userInfoEl = document.getElementById('user-info');

    loginEl.hidden = true;
    contentEl.hidden = false;
    sidebarEl.hidden = false;
    userInfoEl.hidden = false;

    loginBtnEl.addEventListener('click', handleLogin);
    createAccountBtnEl.addEventListener('click', handleCreateAccount);
    logoutBtnEl.addEventListener('click', handleLogout);
}

function initLoggedOut() {

    init('');
    // addHeader(headerEl, '');
    // addSidebar(sidebarEl, "Home");
    // addFooter(footerEl);

    // usernameDisplayEl = document.getElementById('username-display');
    // logoutBtnEl = document.getElementById('logout-btn');
    // userInfoEl = document.getElementById('user-info');

    contentEl.hidden = true;
    sidebarEl.hidden = true;
    userInfoEl.hidden = true;

    loginBtnEl.addEventListener('click', handleLogin);
    createAccountBtnEl.addEventListener('click', handleCreateAccount);
    logoutBtnEl.addEventListener('click', handleLogout);
}

function login(username) {
    loginEl.hidden = true;
    contentEl.hidden = false;
    sidebarEl.hidden = false;
    userInfoEl.hidden = false;


    localStorage.setItem('username', username);
    usernameDisplayEl.textContent = username;
}

function logout() {
    loginEl.hidden = false;
    contentEl.hidden = true;
    sidebarEl.hidden = true;
    userInfoEl.hidden = true;
}

const username = localStorage.getItem('username');

if (username && username !== '') {
    initLoggedIn();
} else {
    initLoggedOut();
}
