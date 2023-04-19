import React from 'react';

import './toDo.css';

import ClientStorage from "../interfaces/clientStorage.js";
import ServerInterface from "../interfaces/serverInterface.js";
import WebSocketInterface from "../interfaces/webSocketInterface.js";

export function ToDo() {

    const [selectedRowNum, setSelectedRowNum] = React.useState(null);
    const [eventRows, setEventRows] = React.useState([]);

    const eventRowsEl = renderEvents();

    React.useEffect(() => {
        loadEvents();
    }, []);
    
    async function loadEvents() {

        const serverEvents = await ServerInterface.getEvents();

        const newEventRows = [];
        for (const [eventDate, eventList] of Object.entries(serverEvents)) {

            for (const event of eventList) {
                newEventRows.push({edittable: false, schoolName: event.schoolName, name: event.name, date: eventDate });
            }
        }
        setEventRows(newEventRows);
    }

    function handleTblRowSelect(selectedRow) {
    
        setSelectedRowNum(selectedRow);
    }


    function getClassName(rowNum) {
        if (rowNum === selectedRowNum) {
            return "selected-row";
        } else {
            return "";
        }
    }

    function handleSchoolNameChange(e) {

        const newEventRows = JSON.parse(JSON.stringify(eventRows));
        newEventRows[selectedRowNum].schoolName = e.target.value;
        setEventRows(newEventRows);
    }

    function handleEventNameChange(e) {

        const newEventRows = JSON.parse(JSON.stringify(eventRows));
        newEventRows[selectedRowNum].name = e.target.value;
        setEventRows(newEventRows);
    }

    function handleEventDateChange(e) {

        const newEventRows = JSON.parse(JSON.stringify(eventRows));
        newEventRows[selectedRowNum].date = e.target.value;
        setEventRows(newEventRows);
    }

    function renderEvents() {
        const eventRowsEl = [];

        let key = 0;
        for (const eventRow of eventRows) {
            const eventNum = key;

            if (!eventRow.edittable) {
                eventRowsEl.push(
                    <tr key={eventNum} className={getClassName(eventNum)} onClick={() => {handleTblRowSelect(eventNum)}}>
                        <td className="to-do-list-table-element">
                            {eventRow.schoolName}
                        </td>
                        <td className="to-do-list-table-element">
                            {eventRow.name}
                        </td>
                        <td className="to-do-list-table-element">
                            {eventRow.date}
                        </td>
                    </tr>
                );
            } else {
                eventRowsEl.push(
                    <tr key={eventNum} className={getClassName(eventNum)} onClick={() => {handleTblRowSelect(eventNum)}}>
                        <td className="to-do-list-table-element">
                            <input className="school-input" type="text" value={eventRow.schoolName} onChange={handleSchoolNameChange}>
                            </input>
                        </td>
                        <td className="to-do-list-table-element">
                            <input className="event-name-input" type="text" value={eventRow.name} onChange={handleEventNameChange}>
                            </input>
                        </td>
                        <td className="to-do-list-table-element">
                            <input className="event-date-input" type="date" value={eventRow.date} onChange={handleEventDateChange}>
                            </input>
                        </td>
                    </tr>
                );
            }
            key++;
        }

        return eventRowsEl;
    }
    
    function handleAdd() {

        const newEventRows = JSON.parse(JSON.stringify(eventRows));
        newEventRows.push({edittable: true, schoolName: '', name: '', date: ''});

        setEventRows(newEventRows);
    }
    
    async function handleRemove() {

        if (selectedRowNum === null) {
            return;
        }


        let newEventRows = JSON.parse(JSON.stringify(eventRows));
        newEventRows.splice(selectedRowNum, 1);
        setSelectedRowNum(null);
        setEventRows(newEventRows);
    }
    
    function handleEdit() {
    
        if (selectedRowNum === null) {
            return;
        }

        const newEventRows = JSON.parse(JSON.stringify(eventRows));
        newEventRows[selectedRowNum].edittable = true;
        setEventRows(newEventRows);

    }
    
    
    async function notifySchoolsSaved(newSchools) {
    
        const oldSchools = await ServerInterface.getSchools();
    
        for (const [schoolName, school] of Object.entries(newSchools)) {
            if (!oldSchools[schoolName]) {
                WebSocketInterface.schoolAdded(schoolName);
            }
        }
    
        for (const [schoolName, school] of Object.entries(oldSchools)) {
            if (!newSchools[schoolName]) {
                WebSocketInterface.schoolRemoved(schoolName);
            }
        }
    }  
    
    async function getSchoolsFromTable() {
    
        let tblSchools = {};
    
        const username = ClientStorage.getUsername();
        const tblBodyEl = document.getElementById("to-do-list-tbl-body");

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
    
            if (tblSchools[schoolName]) {
                tblSchools[schoolName].events.push({ name: eventName, date: eventDate });
            } else {
    
                const newSchool = {
                    schoolName: schoolName,
                    username: username,
                    events: [
                        { name: eventName, date: eventDate },
                    ]
                };
    
                tblSchools[schoolName] = newSchool;
            }
        }
    
        return tblSchools;
    }
    
    async function saveSchools(schools) {
    
        await notifySchoolsSaved(schools);
    
        const serverSchools = await ServerInterface.updateSchools(schools);
    
        if (serverSchools) {
            ClientStorage.setSchools(serverSchools);
        } else {
            ClientStorage.setSchools(schools);
        }
    }

    async function handleSave() {
    
        const schools = await getSchoolsFromTable();
        await saveSchools(schools);

        setSelectedRowNum(null);

        const newEventRows = JSON.parse(JSON.stringify(eventRows));
        for (const newEventRow of newEventRows) {
            newEventRow.edittable = false;
        }
        setEventRows(newEventRows);

    }    

    return (
        <section className="content">
            <div className="to-do-list-container">
                <div className="to-do-list-action-bar">
                    <span className="to-do-list-table-title">To do list</span>
                    <div className="action-bar-btns">
                        <span className="action-bar-btn" onClick={handleAdd}>Add</span>
                        <span className="action-bar-btn" onClick={handleRemove}>Remove</span>
                        <span className="action-bar-btn" onClick={handleEdit}>Edit</span>
                        <span className="action-bar-btn" onClick={handleSave}>Save</span>
                    </div>
                </div>

                <table className="to-do-list-table">
                    <thead className="to-do-list-table-header">
                        <tr>
                            <th className="to-do-list-table-element">School</th>
                            <th className="to-do-list-table-element">Event</th>
                            <th className="to-do-list-table-element">Date</th>
                        </tr>
                    </thead>
                    <tbody id="to-do-list-tbl-body">
                        {eventRowsEl}
                    </tbody>
                </table>
            </div>
        </section>
    );
}