import { generateGridMenuDiv } from './navMenu.js'
import { createEl } from './utilities.js'

export function generateSidebar() {
    const sidebar = createEl.div('sidebar');
    sidebar.appendChild(generateGridMenuDiv());
    return sidebar
}