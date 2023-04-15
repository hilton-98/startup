import { addHeader } from "./components/header.js";
import { addSidebar } from "./components/sidebar.js";
import { addFooter } from "./components/footer.js";


const bodyEl = document.querySelector('body');
const headerEl = bodyEl.querySelector('header');
const mainEl = bodyEl.querySelector('main');
const sidebarEl = mainEl.querySelector('.sidebar');
const tblBodyEl = document.getElementById("to-do-list-table-body");
const footerEl = bodyEl.querySelector('footer');

const addBtnEl = document.getElementById('add-btn');
const removeBtnEl = document.getElementById('remove-btn');
const editBtnEl = document.getElementById('edit-btn');
const saveBtnEl = document.getElementById('save-btn');

let currSelectedRow;

function getInputEl(className, type) {

    const inputEl = document.createElement('input');
    inputEl.className = className;
    inputEl.type = type;
    return inputEl;
}

function handleAddEvent() {
    console.log("Add event");

    const tblRowEl = document.createElement('tr');

    const tblSchoolEl = getTableElement();
    tblSchoolEl.appendChild(getInputEl("school-input", "text"));

    const tblEventNameEl = getTableElement();
    tblEventNameEl.appendChild(getInputEl("event-name-input", "text"));

    const tblEventDateEl = getTableElement();
    tblEventDateEl.appendChild(getInputEl("event-date-input", "date"));

    tblRowEl.append(tblSchoolEl, tblEventNameEl, tblEventDateEl);
    tblRowEl.addEventListener('click', () => handleTblRowSelect(tblRowEl));

    tblBodyEl.appendChild(tblRowEl);
}

function handleRemoveEvent() {
    if (!currSelectedRow || currSelectedRow === "undefined") {
        return;
    }
    tblBodyEl.removeChild(currSelectedRow);
}

function handleEditEvent() {
    console.log("Edit event");
    if (!currSelectedRow) {
        return;
    }

    const tblRowData = currSelectedRow.querySelectorAll(".to-do-list-table-element");

    if (tblRowData[0].querySelector(".school-input")) {
        return;
    }

    const schoolName = tblRowData[0].textContent;
    const eventName = tblRowData[1].textContent;
    const eventDate = tblRowData[2].textContent;

    for (const data of tblRowData) {
        data.textContent = "";
    }

    const schoolInputEl = getInputEl("school-input", "text");
    schoolInputEl.value = schoolName;
    tblRowData[0].appendChild(schoolInputEl);

    const eventNameInput = getInputEl("event-name-input", "text");
    eventNameInput.value = eventName;
    tblRowData[1].appendChild(eventNameInput);

    const eventDateInputEl = getInputEl("event-date-input", "date");
    eventDateInputEl.value = eventDate;
    tblRowData[2].appendChild(eventDateInputEl);
}


async function saveSchools(schools) {

    try {
        const response = await fetch('/api/schools/update', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(schools),
        });
  
        // Store what the service gave us as the schools
        schools = await response.json();
        localStorage.setItem('schools', JSON.stringify(schools));
    } catch {
        // If there was an error then just track schools locally
        localStorage.setItem('schools', JSON.stringify(schools));
    }
}



function getSchoolsFromTable() {

    let schools = {};

    for (const tblRowEl of tblBodyEl.querySelectorAll('tr')) {

        const tblRowData = tblRowEl.querySelectorAll(".to-do-list-table-element");

        let schoolName;
        let eventName;
        let eventDate;

        if (!tblRowData[0].querySelector(".school-input")) {
            schoolName = tblRowData[0].textContent;
            eventName = tblRowData[1].textContent;
            eventDate = tblRowData[2].textContent;
        } else {
            schoolName = tblRowData[0].querySelector('.school-input').value;
            eventName = tblRowData[1].querySelector('.event-name-input').value;
            eventDate = tblRowData[2].querySelector('.event-date-input').value;
        }

        if (schoolName === '') {
            continue;
        }

        if (schools[schoolName]) {
            schools[schoolName].events.push({ name: eventName, date: eventDate });
        } else {

            schools[schoolName] = {
                new: true,
                imageURL: "",
                events: [
                    { name: eventName, date: eventDate },
                ]
            }
        }
    }

    return schools;
}

async function handleSave() {

    const schools = getSchoolsFromTable();

    await saveSchools(schools);

    renderToDoList(tblBodyEl, schools);
    currSelectedRow = undefined;
}

function getTableElement() {
    const tblEl = document.createElement('td');
    tblEl.className = "to-do-list-table-element";
    return tblEl;
}

function handleTblRowSelect(selectedRow) {

    selectedRow.className = "selected-row";
    if (currSelectedRow) {
        currSelectedRow.className = "";
    }
    currSelectedRow = selectedRow;
}

function renderToDoList(tblBodyEl, schools) {
    
    tblBodyEl.innerHTML = "";

    for (const [schoolName, school] of Object.entries(schools)) {
        for (const event of school.events) {
            
            const tblRowEl = document.createElement('tr');
            const tblSchoolEl = getTableElement();
            tblSchoolEl.textContent = schoolName;
            const tblEventNameEl = getTableElement();
            tblEventNameEl.textContent = event.name;
            const tblEventDateEl = getTableElement();
            tblEventDateEl.textContent = event.date;

            tblRowEl.append(tblSchoolEl, tblEventNameEl, tblEventDateEl);
            tblRowEl.addEventListener('click', () => handleTblRowSelect(tblRowEl));

            tblBodyEl.appendChild(tblRowEl);

        }
    }
}

async function loadSchools() {

    let schools = {};

    try {
        const response = await fetch('/api/schools');
        schools = await response.json();

        localStorage.setItem('schools', JSON.stringify(schools));
    } catch {
        const schoolsJSON = localStorage.getItem('schools');
        if (schoolsJSON) {
            schools = JSON.parse(schoolsJSON);
        }
    }

    return schools;
}

async function init() {
    addHeader(headerEl, localStorage.getItem('username'));
    addSidebar(sidebarEl, "To Do");

    renderToDoList(tblBodyEl, await loadSchools());

    addFooter(footerEl);
    
    addBtnEl.addEventListener('click', handleAddEvent);
    removeBtnEl.addEventListener('click', handleRemoveEvent);
    editBtnEl.addEventListener('click', handleEditEvent);
    saveBtnEl.addEventListener('click', handleSave);
}

init();