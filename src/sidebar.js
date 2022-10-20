import { generateHamburgerMenuDiv } from './navMenu.js'
import { createEl } from './utilities.js'

export function generateSidebar() {
    const sidebar = createEl.div('sidebar');
    sidebar.appendChild(generateHamburgerMenuDiv());
    return sidebar
}