const APP_TITLE = "Runway";


export function addHeader(headerEl) {

    headerEl.className = "container-fluid";

        const titleEl = document.createElement('h1');
        titleEl.className = "text-uppercase";
        titleEl.textContent = APP_TITLE;
        
    headerEl.appendChild(titleEl);   
}