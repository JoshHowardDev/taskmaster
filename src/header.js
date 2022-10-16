import hamburgerMenuIcon from './images/icons/hamburger-menu-icon.svg';
import { createEl } from './utilities.js'

export function generateHeader() {
    const header = createEl.div('header');
    header.appendChild(generateHamburgerMenuDiv());
    return header
}

function generateHamburgerMenuDiv() {
    const icon = new Image();
        icon.classList.add('hamburgerMenuIcon');
        icon.src = hamburgerMenuIcon;
        icon.alt = 'Menu';
    const iconDiv = createEl.div('hamburgerMenuIconDiv');
        iconDiv.appendChild(icon);
    return iconDiv;       
}