import React from 'react';

import './calendar.css';

import ClientStorage from '../interfaces/clientStorage'
import ServerInterface from '../interfaces/serverInterface'


export function Calendar() {


    const date = new Date();
    const [calendarMonth, setCalendarMonth] = React.useState(date.getMonth());
    const [calendarYear, setCalendarYear] = React.useState(date.getFullYear());
    const [events, setEvents] = React.useState({});

    React.useEffect(() => {
        loadEvents();
    }, []);
            
    async function loadEvents() {
    
        const serverEvents = await ServerInterface.getEvents();
        if (serverEvents) {
            setEvents(serverEvents);
        } else {
            setEvents(ClientStorage.getEvents());
        }
    }

    // storing full name of all months in array
    const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];

    const daysEl = renderCalendar();
    const eventsEl = renderEvents();
    const currDateEl = getCurrDate();
    const currMonthEl = getCurrMonth();
    

    function isToday(currDay) {
    
        if (currDay !== new Date().getDate()) {
            return false;
        } else if (calendarMonth !== new Date().getMonth()) {
            return false;
        } else if (calendarYear !== new Date().getFullYear()) {
            return false;
        } else {
            return true;
        }
    }

    function renderCalendar() {
    
        const firstDayOfMonth = new Date(calendarYear, calendarMonth, 1).getDay(); // getting first day of month
        const lastDateOfMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate(); // getting last date of month
        const lastDayOfMonth = new Date(calendarYear, calendarMonth, lastDateOfMonth).getDay(); // getting last day of month
        const lastDateOfLastMonth = new Date(calendarYear, calendarMonth, 0).getDate(); // getting last date of previous month
    

        const daysEl = [];

        let key = 0;

        // add last month's days
        for (let i = firstDayOfMonth; i > 0; i--) {
            const currDay = (lastDateOfLastMonth - i + 1);

            daysEl.push(
                <li key={key++} className="inactive">
                    {currDay}
                </li>
            );
        }
    
        // add current month's days
        for (let i = 1; i <= lastDateOfMonth; i++) {
    
            const currDay = i;

            if (isToday(currDay)) {
                daysEl.push(
                    <li key={key++} className="active">
                        {currDay}
                    </li>
                );
            } else {
                daysEl.push(
                    <li key={key++}>
                       {currDay} 
                    </li>
                );
            }
        }
    
        // add last month's days
        for (let i = lastDayOfMonth; i < 6; i++) {
    
            const currDay = (i - lastDayOfMonth + 1);
            daysEl.push(
                <li key={key++} className="inactive">
                    {currDay}
                </li>
            );
        }
    
        return daysEl;
    }

    function getCurrStr(dayOrMonth) {
    
        if (dayOrMonth < 10) {
            return "0" + dayOrMonth;
        } else {
            return dayOrMonth;
        }
    }

    function renderEvents() {

        const eventsEl = [];
        
        const currMonthStr = getCurrStr(calendarMonth + 1);
        const currDateStr = `${calendarYear}-${currMonthStr}`

        let key = 0;

        for (const [eventDate, eventsList] of Object.entries(events)) {

            if (!eventDate.includes(currDateStr)) {
                continue;
            } else {
                for (const event of eventsList) {
                    eventsEl.push(
                        <tr key={key++}>
                            <td className="events-table-element">
                                {event.schoolName}
                            </td>
                            <td className="events-table-element">
                                {event.name}
                            </td>
                        </tr>
                    );
                }
            }
        }
        return eventsEl;
    }


    function getCurrDate() {
        return (
            <p className="current-date">
                {months[calendarMonth]}  {calendarYear}
            </p>
        );
    }

    function getCurrMonth() {
        return (
            <span id="selected-day">
                {`${months[calendarMonth + 1]} ${calendarYear}`}
            </span>
        )
    }

    function handlePrevBtnPress() {

        let currMonth = calendarMonth;
        let currYear = calendarYear;

        currMonth -= 1;

        if(currMonth < 0) {
            currYear -= 1;
            currMonth = 11;
        }
    
        setCalendarMonth(currMonth);
        setCalendarYear(currYear);
    }

    function handleNextBtnPress() {

        let currMonth = calendarMonth;
        let currYear = calendarYear;
        currMonth += 1;
    
        if(currMonth > 11) {
            currYear += 1;
            currMonth = 0;
        }

        setCalendarMonth(currMonth);
        setCalendarYear(currYear);
    }

    return (
        <section className="content">
            <div className="calendar-info-container">
                <div className="calendar-container">

                    <div className="calendar-header">
                        {currDateEl}
                        <div className="icons">
                            <span id="prev" className="material-symbols-rounded" onClick={handlePrevBtnPress}>chevron_left</span>
                            <span id="next" className="material-symbols-rounded" onClick={handleNextBtnPress}>chevron_right</span>
                        </div>
                    </div>
                    <div className="calendar">
    
                        <ul className="weeks">
                            <li>Sun</li>
                            <li>Mon</li>
                            <li>Tue</li>
                            <li>Wed</li>
                            <li>Thu</li>
                            <li>Fri</li>
                            <li>Sat</li>
                        </ul>
    
                        <ul className="days">
                            {daysEl}
                        </ul>

                    </div>
                </div>
                <div className="selected-day-container">
                        <div className="selected-day-title">
                            <span className="selected-day-label">Events for: </span>
                            {currMonthEl}
                        </div>
                    <table className="events-table">
                        <thead>
                            <tr>
                                <th className="events-table-element">School</th>
                                <th className="events-table-element">Event</th>
                            </tr>
                        </thead>
                        <tbody id="events-table-body">
                            {eventsEl}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}