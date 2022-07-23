
class DashboardView {

    addHandlerFixActiveMenu(handler) {
        handler();
    }

    /**
     * Methd will check whether the page contains the classes or not 
     * @param {array} pageClassList list of the classes you want to check
     * @returns
     */
    checkDoesPageContainClasses(pageClassList) {
        const bodyClasses = [...document.querySelector('body').classList];
        const checkStatus = pageClassList.every(value => bodyClasses.includes(value) );

        return checkStatus;
    }

    /**
     * Method will set current active menu item based on the activeMenuText
     * @param {boolean} mainMenu 
     * @param {boolean} subMenu 
     * @param {string} activeMainMenuText 
     * @param {string} activeSubMenuText 
     */
    setCurrentActiveMenuClass(mainMenu = false, subMenu = false, activeMainMenuText = '', activeSubMenuText = '') {
        if ( mainMenu ) {
            // Clear all current menu classes
            document.querySelectorAll('li.menu-top').forEach(el => {
                el.classList
                ?.remove('wp-menu-open')
                ?.remove('wp-has-current-submenu')
                ?.add('wp-not-current-submenu')

                console.log(el.textContent);

                if ( el.textContent === activeMainMenuText ) el.classList.add('wp-has-current-submenu').add('wp-menu-open');
            });
        }

        if ( subMenu ) {
            // Clear all current menu classes
            document.querySelectorAll('.current').forEach(el => el.classList.remove('current'));
            
            // Add class to the element 
            document.querySelectorAll('ul.wp-submenu').forEach(subMenuEl => {
                // subMenuEl is HTML collection so we need to convert it to array
                [...subMenuEl.children].forEach(el => {
                    if ( el.textContent === activeSubMenuText ) el.classList.add('current');
                    if ( el?.firstChild?.tagName === 'A' ) el.firstChild.classList.add('current');
                })
            
            });
        }
    }
}

export default new DashboardView();