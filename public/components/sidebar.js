const navLinkList = [
    { name: "Home", path: "./index.html" },
    { name: "To Do", path: "./toDo.html" },
    { name: "Calendar", path: "./calendar.html" },
    { name: "About", path: "./about.html" },
]


export function addSidebar(sideBarEl, currPageName) {

    sideBarEl.className = "controls";
    
        const sideBarHeaderEl = document.createElement('h2');
        sideBarHeaderEl.className = "text-uppercase";
        sideBarHeaderEl.textContent = "Menu";
    
        const navLinksEl = document.createElement('div');
        navLinksEl.className = "nav-links";

            for (const navLink of navLinkList) {

                const navLinkEl = document.createElement('a');
                navLinkEl.href = navLink.path;
                navLinkEl.textContent = navLink.name;

                if (navLink.name === currPageName) {
                    navLinkEl.className = "current-page";
                }

                navLinksEl.appendChild(navLinkEl);
            }

    sideBarEl.appendChild(sideBarHeaderEl);
    sideBarEl.appendChild(navLinksEl);
}