import hamburgerMenuIcon from './images/icons/hamburger-menu-icon.svg';
import { createEl } from './utilities.js'
import { toggleDropDownMenu } from './DOMManipulation.js'

export function generateHamburgerMenuDiv() {
    const icon = new Image();
        icon.classList.add('hamburgerMenuIcon');
        icon.src = hamburgerMenuIcon;
        icon.alt = 'Menu';
    const iconDiv = createEl.div('hamburgerMenuDiv');
        iconDiv.appendChild(icon);
        iconDiv.addEventListener('click', toggleDropDownMenu);
    return iconDiv;       
}

export function generateDropDownMenu() {

    const navMenuArray = ['Add Daily Tasks', 'Item 2', 'Item 3'];

    const menuItemsDiv = document.createElement('div');
        menuItemsDiv.classList.add('menuItemsDiv')
    
    navMenuArray.forEach((item) => {
        const menuItem = document.createElement('div')
            menuItem.classList.add ('dropDownMenuItem')
            menuItem.innerText = item;
        menuItemsDiv.appendChild(menuItem)
    });

    const menu = document.createElement('div');
        menu.classList.add('dropDownMenu');
        menu.appendChild(menuItemsDiv);
    return menu;

}