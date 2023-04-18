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
    await displayQuote();
}

init();