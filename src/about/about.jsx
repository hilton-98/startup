import React from 'react';

import './about.css';

export function About() {

    const [quote, setQuote] = React.useState('Loading...');
    const [quoteAuthor, setQuoteAuthor] = React.useState('Loading');

    React.useEffect(() => {

        async function loadQuote() {
    
            const response = await fetch('https://api.quotable.io/random');
            const data = await response.json();
            setQuote(data.content);
            setQuoteAuthor(data.author);
        }

        loadQuote();
        
    }, []);
    
    return (
        <section className="content">
            <div className="about-text">
                <p>
                    Applying to graduate school can be a pain. Every school wants different essays written, has different 
                    interview processes, and different deadlines for everything they want submitted! If you are only 
                    applying to one school then tracking that school's requirements might not bother you, but add a few 
                    more schools and it quickly becomes a headache! <span className="app-title">Runway</span> provides a 
                    central location for storing all the information about the application deadlines and requirements 
                    for graduate school applications.
                </p>
                <p>INSTRUCTIONS:</p>
                <ol>
                    <li>
                        View your schools on the HOME tab.
                    </li>
                    <ul>
                        <li>
                            Press remove to stop tracking all events for that school.
                        </li>
                    </ul>
                    <li>
                        Add events on the TO DO tab.
                    </li>
                    <ul>
                        <li>
                            You must have an event selcted for the "Remove" and "Edit" buttons to work. Selected rows can be seen highlighted in blue.
                        </li>
                    </ul>
                    <li>
                        View events on the CALENDAR tab.
                    </li>
                    <ul>
                        <li>
                            Use the previous and next chevron icons to view events for the next or previous months.
                        </li>
                    </ul>
                </ol>
                <div>
                    <p className="quote">
                        "{quote}""
                    </p>
                    <p className="author">
                        --{quoteAuthor}
                    </p>
                </div>            
            </div>
        </section>
    );
}