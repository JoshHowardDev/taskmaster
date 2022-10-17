import { generateHamburgerMenuDiv } from './navMenu.js'
import { createEl } from './utilities.js'

export function generateHeader() {
    const header = createEl.div('header');
    header.appendChild(generateHamburgerMenuDiv());
    return header
}