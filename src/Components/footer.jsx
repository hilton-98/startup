import React from 'react';

import './footer.css';

export function Footer() {

    const AUTHOR_NAME = "Kevin Hilton";
    const GIT_HUB_LINK = "https://github.com/hilton-98/startup";

    return (
        <footer className="container-fluid">
            <span className="author-name">
                By {AUTHOR_NAME}
            </span>
            <a className="git-hub-link" href={GIT_HUB_LINK}>
                GitHub
            </a>
        </footer>
    );
}