import react from 'react';

import './sidebar.css';


export function Sidebar(currPageName) {
    
    const navLinkList = [
        { name: "Home", path: "./index.html" },
        { name: "To Do", path: "./toDo.html" },
        { name: "Calendar", path: "./calendar.html" },
        { name: "About", path: "./about.html" },
    ];


    let path = window.location.pathname;
    let pageName = path.split("/").pop();

    const navLinksEl = [];
    for (let i = 0; i < navLinkList.length; i++) {

        const navLink = navLinkList[i];

        let className = 'nav-link';
        if (navLink.path.includes(pageName)) {
            className += ' current-page-link';
        }

        navLinksEl.push(
            <a key={i} className={className} href={navLink.path}>
                {navLink.name}
            </a>
        );
    }

    return (
        <section className="sidebar">
            <h2 className="sidebar-header">
                Menu
            </h2>
            <div className="nav-links">
                {navLinksEl}
            </div>
        </section>
    );
}