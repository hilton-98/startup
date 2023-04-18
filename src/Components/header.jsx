import React from 'react';

import './header.css';

import ClientStorage from "../clientStorage.js";
import ServerInterface from "../serverInterface.js";


export function Header() {

    const APP_TITLE = "Runway";


    async function handleLogout() {

        await ServerInterface.logout();
        ClientStorage.clear();
        window.location.replace("./index.html");
    }

    const username = ClientStorage.getUsername();

    return (
        <header className="container-fluid">
            <h1 className="text-uppercase">
                {APP_TITLE}
            </h1>
            <div id="user-info" className="user-info">
                <span id="username-display" className="username-display">
                    {username}
                </span>
                <span id="logout-btn" className="logout-action-btn" onClick={handleLogout}>
                    Logout
                </span>
            </div>
        </header>
    );
}