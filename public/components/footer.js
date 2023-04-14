const AUTHOR_NAME = "Kevin Hilton";
const GIT_HUB_LINK = "https://github.com/hilton-98/startup";


export function addFooter(footerEl) {

    footerEl.className = "container-fluid";

            const authorNameEl = document.createElement('span');
            authorNameEl.textContent = "By " + AUTHOR_NAME;

            const gitHubLinkEl = document.createElement('a');
            gitHubLinkEl.className = "text-reset";
            gitHubLinkEl.href = GIT_HUB_LINK;
            gitHubLinkEl.textContent = "GitHub";
        
    footerEl.appendChild(authorNameEl);
    footerEl.appendChild(gitHubLinkEl);
}