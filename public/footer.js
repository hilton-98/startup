export function addFooter(documentBody) {

    const footerEl = document.createElement('footer');
    footerEl.className = "container-fluid";

    const authorNameEl = document.createElement('span');
    authorNameEl.textContent = "By Kevin Hilton";

    const gitHubLinkEl = document.createElement('a');
    gitHubLinkEl.className = "text-reset";
    gitHubLinkEl.href = "https://github.com/hilton-98/startup";
    gitHubLinkEl.textContent = "GitHub";
    
    footerEl.appendChild(authorNameEl);
    footerEl.appendChild(gitHubLinkEl);
    
    documentBody.appendChild(footerEl);

}