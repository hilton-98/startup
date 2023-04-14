import { addHeader } from "./components/header.js";
import { addFooter } from "./components/footer.js";

const bodyEl = document.querySelector('body');

addHeader(bodyEl.querySelector('header'));
addFooter(bodyEl.querySelector('footer'));

