import React from 'react';

import './toDo.css';

import ClientStorage from "../interfaces/clientStorage.js";
import ServerInterface from "../interfaces/serverInterface.js";
import WebSocketInterface from "../interfaces/webSocketInterface.js";

export function ToDo() {

    const [schools, setSchools] = React.useState({});
    const [numEmptyRows, setNumEmptyRows] = React.useState(0);
    const [selectedRowNum, setSelectedRowNum] = React.useState(null);

    const toDoListEl = renderToDoList();

    async function loadSchools() {

        const serverSchools = await ServerInterface.getSchools();

        if (serverSchools) {
            setSchools(serverSchools);
        } else {
            setSchools(ClientStorage.getSchools());
        }
    }

    React.useEffect(() => {
        loadSchools();
    }, []);


    function handleTblRowSelect(selectedRow) {
    
        console.log("row selected: " + selectedRow);
        setSelectedRowNum(selectedRow);
    }


    function getClassName(rowNum) {
        if (rowNum === selectedRowNum) {
            return "selected-row";
        } else {
            return "";
        }
    }

    function renderToDoList() {
        
        const toDoListEl = [];

        const schoolsMap = Object.entries(schools);

        let rowNum = 0;
        for (const [schoolName, school] of schoolsMap) {

            const eventNum = rowNum;

            for (const event of school.events) {

                toDoListEl.push(
                    <tr key={eventNum} className={getClassName(eventNum)} onClick={() => {handleTblRowSelect(eventNum)}}>
                        <td className="to-do-list-table-element">
                            {schoolName}
                        </td>
                        <td className="to-do-list-table-element">
                            {event.name}
                        </td>
                        <td className="to-do-list-table-element">
                            {event.date}
                        </td>
                    </tr>
                );
                rowNum++;
            }
        }

        for (let i = 0; i < numEmptyRows; i++) {

            const eventNum = rowNum;

            toDoListEl.push(
                <tr key={eventNum} className={getClassName(eventNum)} onClick={() => {handleTblRowSelect(eventNum)}}>
                    <td className="to-do-list-table-element">
                        <input className="school-input" type="text">
                        </input>
                    </td>
                    <td className="to-do-list-table-element">
                        <input className="event-name-input" type="text">
                        </input>
                    </td>
                    <td className="to-do-list-table-element">
                        <input className="event-date-input" type="date">
                        </input>
                    </td>
                </tr>
            );
            rowNum++;
        }

        return toDoListEl;
    }
    
    function handleAdd() {
        setNumEmptyRows(numEmptyRows + 1);
    }
    
    async function handleRemove() {

        console.log("handle Remove");

        if (selectedRowNum === null) {
            return;
        }

        const tblBodyEl = document.getElementById("to-do-list-tbl-body");
        const selectedRow = tblBodyEl.querySelector(".selected-row");
        console.log("selectedRow: " + selectedRow);
        tblBodyEl.removeChild(selectedRow);


        console.log("Selected row num: " + selectedRowNum);

        const schoolsMap = Object.entries(schools);

        let rowNum = 0;
        for (const [schoolName, school] of schoolsMap) {

            for (const event of school.events) {
                if (rowNum === selectedRowNum) {

                    let newSchools = schools;
                    let newSchoolEvents = newSchools[schoolName].events;
                    const eventIndex = newSchoolEvents.indexOf(event);

                    newSchools[schoolName].events.splice(eventIndex, 1);

                    setSchools(newSchools);
                    setSelectedRowNum(null);
                    return;
                }
                rowNum++;
            }
        }

        setNumEmptyRows(numEmptyRows - 1);
        setSelectedRowNum(null);
    }
    
    function handleEdit() {
    
    //     if (!currSelectedRow) {
    //         return;
    //     }
    
    //     const tblRowData = currSelectedRow.querySelectorAll(".to-do-list-table-element");
    
    //     if (tblRowData[0].querySelector(".school-input")) {
    //         return;
    //     }
    
    //     const schoolName = tblRowData[0].textContent;
    //     const eventName = tblRowData[1].textContent;
    //     const eventDate = tblRowData[2].textContent;
    
    //     for (const data of tblRowData) {
    //         data.textContent = "";
    //     }
    
    //     const schoolInputEl = getInputEl("school-input", "text");
    //     schoolInputEl.value = schoolName;
    //     tblRowData[0].appendChild(schoolInputEl);
    
    //     const eventNameInput = getInputEl("event-name-input", "text");
    //     eventNameInput.value = eventName;
    //     tblRowData[1].appendChild(eventNameInput);
    
    //     const eventDateInputEl = getInputEl("event-date-input", "date");
    //     eventDateInputEl.value = eventDate;
    //     tblRowData[2].appendChild(eventDateInputEl);
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

        setSchools(schools);
        setNumEmptyRows(0);
        setSelectedRowNum(null);
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
                        {toDoListEl}
                    </tbody>
                </table>
            </div>
        </section>
    );
}