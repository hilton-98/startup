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
const sidebarEl = mainEl.querySelector('.sidebar');
const footerEl = bodyEl.querySelector('footer');

addHeader(headerEl);
addSidebar(sidebarEl, "Home");
addFooter(footerEl);

function init() {
    addHeader(headerEl);
    addFooter(footerEl);
}

function login() {
    addSidebar(sidebarEl, "Home");
}

init();