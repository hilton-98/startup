import './sidebar.css';

const navLinkList = [
    { name: "Home", path: "./index.html" },
    { name: "To Do", path: "./toDo.html" },
    { name: "Calendar", path: "./calendar.html" },
    { name: "About", path: "./about.html" },
]


export function Sidebar(currPageName) {
    
    return (
        <section className="sidebar">
            <h2 className="sidebar-header">
                Menu
            </h2>
            <div className="nav-links">
                <a className='nav-link' href="./index.html">
                    Home
                </a>
                <a className='nav-link' href="./index.html">
                    To Do
                </a>
                <a className='nav-link' href="./index.html">
                    Calendar
                </a>
                <a className='nav-link' href="./index.html">
                    About
                </a>
            </div>
        </section>
    );
}