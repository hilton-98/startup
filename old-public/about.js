import { addHeader } from "./components/header.js";
import { addSidebar } from "./components/sidebar.js";
import { addFooter } from "./components/footer.js";


const bodyEl = document.querySelector('body');
const headerEl = bodyEl.querySelector('header');
const mainEl = bodyEl.querySelector('main');
const sidebarEl = mainEl.querySelector('.sidebar');
const footerEl = bodyEl.querySelector('footer');


function renderQuote(quote) {

    const containerEl = document.getElementById('quote-container');

    const quoteEl = document.createElement('p');
    quoteEl.classList.add('quote');
    const authorEl = document.createElement('p');
    authorEl.classList.add('author');

    quoteEl.textContent = `"${quote.content}"`;
    authorEl.textContent = `--${quote.author}`;

    containerEl.appendChild(quoteEl);
    containerEl.appendChild(authorEl);
  }

async function displayQuote() {

    const response = await fetch('https://api.quotable.io/random');
    const resObj = await response.json();
    renderQuote(resObj);
}


async function init() {
    addHeader(headerEl);
    addSidebar(sidebarEl, "About");
    addFooter(footerEl);
    await displayQuote();
}

init();