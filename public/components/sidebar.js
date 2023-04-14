

export function addSidebar(sideBarEl) {

    sideBarEl.className = "controls";
    
        const sideBarHeaderEl = document.createElement('h2');
        sideBarHeaderEl.className = "text-uppercase";
        sideBarHeaderEl.textContent = "Menu";
    
        const navLinksEl = document.createElement('div');
        navLinksEl.className = "nav-links";

            const homeLinkEl = document.createElement('a');
            homeLinkEl.href = "index.html";
            homeLinkEl.textContent = "Home";
            const toDoLinkEl = document.createElement('a');
            toDoLinkEl.href = "toDo.html";
            toDoLinkEl.textContent = "To do";
            const calendarLinkEl = document.createElement('a');
            calendarLinkEl.href = "calendar.html";
            calendarLinkEl.textContent = "Calendar";
            const aboutLinkEl = document.createElement('a');
            aboutLinkEl.href = "about.html";
            aboutLinkEl.textContent = "About";
            aboutLinkEl.className = "current-page";

        navLinksEl.appendChild(homeLinkEl);
        navLinksEl.appendChild(toDoLinkEl);
        navLinksEl.appendChild(calendarLinkEl);
        navLinksEl.appendChild(aboutLinkEl);

    sideBarEl.appendChild(sideBarHeaderEl);
    sideBarEl.appendChild(navLinksEl);
}