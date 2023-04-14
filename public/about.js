import { addHeader } from "./components/header.js";
import { addSidebar } from "./components/sidebar.js";
import { addFooter } from "./components/footer.js";


const bodyEl = document.querySelector('body');
const headerEl = bodyEl.querySelector('header');
const mainEl = bodyEl.querySelector('main');
const sidebarEl = mainEl.querySelector('.sidebar');
const footerEl = bodyEl.querySelector('footer');

addHeader(headerEl);
addSidebar(sidebarEl);
addFooter(footerEl);
