const AUTHOR_NAME = "Kevin Hilton";
const GIT_HUB_LINK = "https://github.com/hilton-98/startup";


export function addFooter(footerEl) {

    footerEl.className = "container-fluid";

            const authorNameEl = document.createElement('span');
            authorNameEl.className = "author-name";
            authorNameEl.textContent = "By " + AUTHOR_NAME;

            const gitHubLinkEl = document.createElement('a');
            gitHubLinkEl.className = "git-hub-link";
            gitHubLinkEl.href = GIT_HUB_LINK;
            gitHubLinkEl.textContent = "GitHub";
        
    footerEl.appendChild(authorNameEl);
    footerEl.appendChild(gitHubLinkEl);
}