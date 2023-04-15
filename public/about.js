import { addHeader } from "./components/header.js";
import { addSidebar } from "./components/sidebar.js";
import { addFooter } from "./components/footer.js";


const bodyEl = document.querySelector('body');
const headerEl = bodyEl.querySelector('header');
const mainEl = bodyEl.querySelector('main');
const sidebarEl = mainEl.querySelector('.sidebar');
const footerEl = bodyEl.querySelector('footer');

function displayQuote(data) {

    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.getElementById('quote-container');
  
        const quoteEl = document.createElement('p');
        quoteEl.classList.add('quote');
        const authorEl = document.createElement('p');
        authorEl.classList.add('author');
  
      quoteEl.textContent = `"${data.content}"`;
        authorEl.textContent = `--${data.author}`;
  
        containerEl.appendChild(quoteEl);
        containerEl.appendChild(authorEl);
      });
}


function init() {
    addHeader(headerEl, localStorage.getItem('username'));
    addSidebar(sidebarEl, "About");
    addFooter(footerEl);
    displayQuote();
}

init();