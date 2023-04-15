import { addHeader } from "./components/header.js";
import { addSidebar } from "./components/sidebar.js";
import { addFooter } from "./components/footer.js";


const bodyEl = document.querySelector('body');
const headerEl = bodyEl.querySelector('header');
const mainEl = bodyEl.querySelector('main');
const sidebarEl = mainEl.querySelector('.sidebar');
const footerEl = bodyEl.querySelector('footer');


const daysEl = document.querySelector(".days");
const currentDateEl = document.querySelector(".current-date");
const prevBtnEl = document.getElementById('prev');
const nextBtnEl = document.getElementById('next');

const selectedDayDisplayEl = document.getElementById('selected-day');
const eventsTblBodyEl = document.getElementById('events-table-body');

let prevSelectedElClassName = '';
let prevSelectedEl;


// storing full name of all months in array
const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];


function isToday(currDay, currMonth, currYear) {

    if (currDay !== new Date().getDate()) {
        return false;
    } else if (currMonth !== new Date().getMonth()) {
        return false;
    } else if (currYear !== new Date().getFullYear()) {
        return false;
    } else {
        return true;
    }
}

function getCurrStr(dayOrMonth) {

    if (dayOrMonth < 10) {
        return "0" + dayOrMonth;
    } else {
        return dayOrMonth;
    }
}

function getLocalEventsList() {
    const schoolsJSON = localStorage.getItem('schools');
    if (!schoolsJSON) {
        return {};
    }
    const schools = JSON.parse(schoolsJSON);

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


async function getEventsList() {

    console.log("Gete events list");

    try {
        const response = await fetch('/api/events', {
          method: 'GET',
          headers: { 'content-type': 'application/json' },
        });
  
        // Store what the service gave us as the events
        const eventsList = await response.json();
        localStorage.setItem('events', JSON.stringify(eventsList));
        return eventsList;

      } catch {
        console.log("ERROR");
        // If there was an error then just get events locally
        const eventsListJSON = localStorage.getItem('events');
        if (eventsListJSON) {
            return JSON.parse(eventsListJSON);
        } else {
            return getLocalEventsList();
        }
      }
}

function getTableElement() {
    const tblEl = document.createElement('td');
    tblEl.className = "events-table-element";
    return tblEl;
}


function renderEventsList(currDateStr, eventsList) {

    eventsTblBodyEl.innerHTML = "";
    if (eventsList[currDateStr]) {

        for (const event of eventsList[currDateStr]) {

            const tblRowEl = document.createElement('tr');
            const tblSchoolEl = getTableElement();
            tblSchoolEl.textContent = event.schoolName;
            const tblEventNameEl = getTableElement();
            tblEventNameEl.textContent = event.name;

            tblRowEl.append(tblSchoolEl, tblEventNameEl);

            eventsTblBodyEl.appendChild(tblRowEl);
        }
    }
}

async function handleDateSelected(selectedDateEl, currDay, currMonth, currYear) {

    let currDayStr = getCurrStr(currDay);
    let currMonthStr = getCurrStr(currMonth + 1);
    let currDateStr = `${currYear}-${currMonthStr}-${currDayStr}`;

    console.log('currDate: ' + currDateStr);

    if (prevSelectedEl) {
        prevSelectedEl.className = prevSelectedElClassName;
    }

    prevSelectedEl = selectedDateEl;
    prevSelectedElClassName = selectedDateEl.className;

    selectedDateEl.className = "selected-date";

    selectedDayDisplayEl.textContent = currDateStr;

    const eventsList = await getEventsList();
    renderEventsList(currDateStr, eventsList);

}

function getDateEl(className, currDay, currMonth, currYear) {

    const dateEl = document.createElement('li');
    dateEl.className = className;
    dateEl.textContent = currDay;
    dateEl.addEventListener('click', () => handleDateSelected(dateEl, currDay, currMonth, currYear));

    return dateEl;
}

function renderCalendar(currMonth, currYear) {

    const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(); // getting first day of month
    const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(); // getting last date of month
    const lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(); // getting last day of month
    const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month

    daysEl.innerHTML = "";

    // add last month's days
    for (let i = firstDayOfMonth; i > 0; i--) {

        let currDay = (lastDateOfLastMonth - i + 1);
        daysEl.appendChild(getDateEl("inactive", currDay, currMonth, currYear));
    }

    // add current month's days
    for (let i = 1; i <= lastDateOfMonth; i++) {

        let currDay = i;

        if (isToday(i, currMonth, currYear)) {
            daysEl.appendChild(getDateEl("active", currDay, currMonth, currYear));
        } else {
            daysEl.appendChild(getDateEl("", currDay, currMonth, currYear));
        }
    }

    // add last month's days
    for (let i = lastDayOfMonth; i < 6; i++) {

        let currDay = (i - lastDayOfMonth + 1);
        daysEl.appendChild(getDateEl("inactive", currDay, currMonth, currYear));
    }

    currentDateEl.textContent = months[currMonth] + ' ' + currYear;
}

function init() {

    addHeader(headerEl, localStorage.getItem('username'));
    addSidebar(sidebarEl, "Calendar");

    // getting new date, current year and month
    const date = new Date();
    let currMonth = date.getMonth();
    let currYear = date.getFullYear();

    renderCalendar(currMonth, currYear);
    addFooter(footerEl);

    prevBtnEl.addEventListener('click', () => {
        currMonth -= 1;

        if(currMonth < 0) {
            currYear -= 1;
            currMonth = 11;
        }

        renderCalendar(currMonth, currYear);
    });

    nextBtnEl.addEventListener('click', () => {
        currMonth += 1;

        if(currMonth > 11) {
            currYear += 1;
            currMonth = 0;
        }

        renderCalendar(currMonth, currYear);
    });
}

init();