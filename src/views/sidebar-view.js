class SidebarView {
    #pubSub;
    #sidebar;
    #myLists;
    #myListsTitle;
    #listSection;
    #addList;
    #addListIconContainer;
    #addListIcon;
    #addListName;

    constructor(pubSub) {
        this.#pubSub = pubSub;

        const content = this.#getElement('content');

        this.#sidebar = this.#createElement('div');
        this.#sidebar.id = 'sidebar';

        this.#myLists = this.#createElement('div');
        this.#myLists.id = 'my-lists';

        this.#myListsTitle = this.#createElement('div');
        this.#myListsTitle.innerText = 'My Lists';
        this.#myListsTitle.id = 'my-lists-title';

        this.#listSection = this.#createElement('div');
        this.#listSection.id = 'list-section';

        this.#addList = this.#createElement('div');
        this.#addList.id = 'sidebar-add-list';

        this.#addListIconContainer = this.#createElement('div');
        this.#addListIconContainer.id = 'sidebar-add-list-icon';

        this.#addListIcon = this.#createElement('i', 'fas fa-plus');

        this.#addListName = this.#createElement('div');
        this.#addListName.innerText = 'Add List';
        this.#addListName.id = 'sidebar-add-list-name';

        this.#myLists.append(this.#myListsTitle);
        this.#addListIconContainer.append(this.#addListIcon);
        this.#addList.append(this.#addListIconContainer, this.#addListName);

        this.#sidebar.append(this.#myLists, this.#listSection, this.#addList);

        content.append(this.#sidebar);
    }

    #getElement(selector) {
        return document.querySelector(selector);
    }

    #createElement(tag, classList) {
        const element = document.createElement(tag);
       
        if (classList) {
            classList.split(' ').forEach(classStr => {
                element.classList.add(classStr); 
            });
        }

        return element;
    }
}

export default SidebarView;