function generateHamburgerMenuDiv() {
    const icon = new Image();
        icon.classList.add('hamburgerMenuIcon');
        icon.src = hamburgerMenuIcon;
        icon.alt = 'Menu';
    const iconDiv = createEl.div('hamburgerMenuIconDiv');
        iconDiv.appendChild(icon);
    return iconDiv;       
}

const navMenuArray = ['Add Daily Tasks'];

function generateDropDownMenu(menuItemsArray) {

    const menuItemsDiv = document.createElement('div');
        menuItemsDiv.classList.add('menuItemsDiv')
    
    menuItemsArray.forEach((item) => {
        const menuItem = document.createElement('div')
            menuItem.classList.add ('dropDownmenuItem')
            menuItem.innerText = item;
        menuItemsDiv.appendChild(menuItem)
    });

    const menu = document.createElement('div');
        menu.classList.add('dropDownMenu');
        menu.appendChild(menuItemsDiv);
    return menu;

}