import PubSub from "pubsub-js";
import { list } from "postcss";
import List from "./list";
import './styles/style.css';

const LIST_COLORS = ['#FF453B',
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
const lists = [];

const defaultList = new List('Reminders', '#78C3FF');
lists.push(defaultList);

const listSection = document.querySelector('#list-section');
const sidebarAddListIcon = document.querySelector('#sidebar-add-list-icon');
const sidebarAddListName = document.querySelector('#sidebar-add-list-name');
const mainSectionAddListIcon = document.querySelector('#main-section-add-list > i');

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const generateRandomListColor = () => {
    let randomInt = getRandomInt(LIST_COLORS.length);
    return LIST_COLORS[randomInt];
}

const addNewList = (listName, listColor) => {
    const list = new List(listName, listColor);
    lists.push(list);
}

const destroyListSection = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const buildListSection = (parent, lists) => {
    lists.forEach(list => {
        const listDiv = document.createElement('div');
        listDiv.classList.add('list');

        const iconDiv = document.createElement('div');
        iconDiv.classList.add('list-icon');
        iconDiv.style.backgroundColor = list.color;

        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-list-ul');

        const listNameDiv = document.createElement('div');
        listNameDiv.innerText = list.name;
        listNameDiv.classList.add('list-name');
        
        const listCountDiv = document.createElement('div');
        listCountDiv.innerText = list.numToDos;
        listCountDiv.classList.add('list-count');

        iconDiv.appendChild(icon);
        listDiv.appendChild(iconDiv);
        listDiv.appendChild(listNameDiv);
        listDiv.appendChild(listCountDiv);

        parent.appendChild(listDiv);
    });
}


const createAddNewListInput = (parent, listColor) => {
    const listDiv = document.createElement('div');
    listDiv.classList.add('list');

    const iconDiv = document.createElement('div');
    iconDiv.classList.add('list-icon');
    iconDiv.style.backgroundColor = listColor;

    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-list-ul');

    const listNameDiv = document.createElement('div');
    listNameDiv.classList.add('list-name');

    const listNameInput = document.createElement('input');
    listNameInput.type = 'text';
    listNameInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addNewList(listNameInput.value, listColor);
            destroyListSection(listSection);
            buildListSection(listSection, lists);
        }
    });

    iconDiv.appendChild(icon);
    listNameDiv.appendChild(listNameInput);
    listDiv.appendChild(iconDiv);
    listDiv.appendChild(listNameDiv);

    parent.appendChild(listDiv);
    listNameInput.focus();
}

sidebarAddListIcon.addEventListener('click', function() {
    createAddNewListInput(listSection, generateRandomListColor());
});

sidebarAddListName.addEventListener('click', function() {
    createAddNewListInput(listSection, generateRandomListColor());
});

// addNewList('Test');
// destroyListSection(listSection);
buildListSection(listSection, lists);
// createAddNewListInput(listSection, generateRandomListColor());