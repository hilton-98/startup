import React from 'react';

import './mySchools.css';

import ClientStorage from "../interfaces/clientStorage";
import ServerInterface from '../interfaces/serverInterface';
import WebSocketInterface from '../interfaces/webSocketInterface';


export function MySchools() {

    const [schools, setSchools] = React.useState({});

    const schoolsEl = renderSchools();

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


    function renderSchools() {

        const COLS_PER_ROW = 3;

        const schoolsEl = [];
        let schoolsMap = Object.entries(schools);
    
        for (let i = 0; i < schoolsMap.length; i += COLS_PER_ROW) {
    
            let schoolsRowEl = [];
    
            for (let j = i; j < schoolsMap.length && (j - i < COLS_PER_ROW); j++) {
    
                const [schoolName, school] = schoolsMap[j];
                const nextEvent = school.events[0];
    
                schoolsRowEl.push(
                    <td key={j}>
                        <div className="school-body">
                            <h5 className="school-name">
                                {schoolName}
                            </h5>
                            <div className="school-text-container">
                                <p className="school-text">
                                    Next Up: {nextEvent.name}
                                </p>
                                <p className="school-text">
                                    On: {nextEvent.date}
                                </p>
                                <span className="homepage-btn" onClick={() => handleRemoveSchool(school)}>
                                    Remove
                                </span>
                            </div>
                        </div>
                    </td>
                );
            }
    
            schoolsEl.push(                
                <tr key={i}>
                    {schoolsRowEl}
                </tr>
            );
        }
        return schoolsEl;
    }
    

    async function removeSchool(school) {

        const serverSchools = await ServerInterface.removeSchool(school);
    
        if (serverSchools) {
            ClientStorage.setSchools(serverSchools);
            setSchools(serverSchools);
        } else {
            ClientStorage.removeSchool(school.schoolName);
            setSchools(ClientStorage.getSchools());
        }
    }
    
    async function handleRemoveSchool(school) {
    
        WebSocketInterface.schoolRemoved(school.schoolName);
        await removeSchool(school);
        await loadSchools();
    }

    return (
        <div id="my-schools" className="demo-box container">
            <table className="my-schools-table">
                <thead className="my-schools-table-header">
                    <tr>
                        <th className="my-schools-table-element"></th>
                        <th className="my-schools-table-element"></th>
                        <th className="my-schools-table-element"></th>
                    </tr>
                </thead>
                <tbody>
                    {schoolsEl}
                </tbody>
            </table>
        </div>
    );
}