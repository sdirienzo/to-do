class SidebarView {
    listColors = ['#FF453B',
                    '#FF9F0C',
                    '#FFD60B',
                    '#30D15B',
                    '#78C3FF',
                    '#1584FF',
                    '#5E5CE6',
                    '#FF4F79',
                    '#D57FF5',
                    '#C9A675',
                    '#727E87',
                    '#EBB5AE'];
    sidebar;
    myLists;
    myListsTitle;
    listSection;
    addList;
    addListIconContainer;
    addListIcon;
    addListName;
    pubSub;

    constructor(pubSub) {
        this.pubSub = pubSub;

        const content = this.getElement('#content');

        this.sidebar = this.createElement('div');
        this.sidebar.id = 'sidebar';

        this.myLists = this.createElement('div');
        this.myLists.id = 'my-lists';

        this.myListsTitle = this.createElement('div');
        this.myListsTitle.innerText = 'My Lists';
        this.myListsTitle.id = 'my-lists-title';

        this.listSection = this.createElement('div');
        this.listSection.id = 'list-section';

        this.addList = this.createElement('div');
        this.addList.id = 'sidebar-add-list';

        this.addListIconContainer = this.createElement('div');
        this.addListIconContainer.id = 'sidebar-add-list-icon';

        this.addListIcon = this.createElement('i', 'fas fa-plus');

        this.addListName = this.createElement('div');
        this.addListName.innerText = 'Add List';
        this.addListName.id = 'sidebar-add-list-name';

        this.myLists.append(this.myListsTitle);
        this.addListIconContainer.append(this.addListIcon);
        this.addList.append(this.addListIconContainer, this.addListName);

        this.sidebar.append(this.myLists, this.listSection, this.addList);

        content.append(this.sidebar);
    }

    subscribeView() {
        this.pubSub.subscribe('display-lists', this.displayLists.bind(this));

        this.addListIconContainer.addEventListener('click', () => {
            this.displayAddNewListInput(this.generateRandomListColor());
        });

        this.addListName.addEventListener('click', () => {
            this.displayAddNewListInput(this.generateRandomListColor());
        });
    }

    getElement(selector) {
        return document.querySelector(selector);
    }

    createElement(tag, classList) {
        const element = document.createElement(tag);
       
        if (classList) {
            classList.split(' ').forEach(classStr => {
                element.classList.add(classStr); 
            });
        }

        return element;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    
    generateRandomListColor() {
        const randomInt = this.getRandomInt(this.listColors.length);
        return this.listColors[randomInt];
    }

    destroyListSection() {
        while (this.listSection.firstChild) {
            this.listSection.removeChild(this.listSection.firstChild);
        }
    }

    displayLists(msg, lists) {
        this.destroyListSection();

        lists.forEach(list => {
            const listDiv = this.createElement('div', 'list');   
            
            const iconDiv = this.createElement('div', 'list-icon');
            iconDiv.style.backgroundColor = list.color;
    
            const icon = this.createElement('i', 'fas fa-list-ul');
     
            const listNameDiv = this.createElement('div', 'list-name');
            listNameDiv.innerText = list.name;
            
            const listCountDiv = this.createElement('div', 'list-count');
            listCountDiv.innerText = list.numToDos;
     
            iconDiv.appendChild(icon);
            listDiv.appendChild(iconDiv);
            listDiv.appendChild(listNameDiv);
            listDiv.appendChild(listCountDiv);
    
            this.listSection.appendChild(listDiv);
        });
    }

    displayAddNewListInput(listColor) {
        const listDiv = this.createElement('div', 'list');
    
        const iconDiv = this.createElement('div', 'list-icon');
        iconDiv.style.backgroundColor = listColor;
    
        const icon = this.createElement('i', 'fas fa-list-ul');
    
        const listNameDiv = this.createElement('div', 'list-name');
    
        const listNameInput = this.createElement('input');
        listNameInput.type = 'text';
        listNameInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const listData = {};
                listData.name = listNameInput.value;
                listData.color = listColor;
                this.pubSub.publish('add-list', listData);
            }
        });
    
        iconDiv.appendChild(icon);
        listNameDiv.appendChild(listNameInput);
        listDiv.appendChild(iconDiv);
        listDiv.appendChild(listNameDiv);
    
        this.listSection.appendChild(listDiv);
        listNameInput.focus();
    }
}

export default SidebarView;