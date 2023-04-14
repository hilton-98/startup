const navLinkList = [
    { name: "Home", path: "./index.html" },
    { name: "To Do", path: "./toDo.html" },
    { name: "Calendar", path: "./calendar.html" },
    { name: "About", path: "./about.html" },
]


export function addSidebar(sideBarEl, currPageName) {
    
    const sideBarHeaderEl = document.createElement('h2');
    sideBarHeaderEl.className = "sidebar-header";
    sideBarHeaderEl.textContent = "Menu";

    const navLinksEl = document.createElement('div');
    navLinksEl.className = "nav-links";

    for (const navLink of navLinkList) {

        const navLinkEl = document.createElement('a');
        navLinkEl.className = "nav-link";
        navLinkEl.href = navLink.path;
        navLinkEl.textContent = navLink.name;

        if (navLink.name === currPageName) {
            navLinkEl.className += " current-page-link";
        }

        navLinksEl.appendChild(navLinkEl);
    }

    sideBarEl.appendChild(sideBarHeaderEl);
    sideBarEl.appendChild(navLinksEl);
}