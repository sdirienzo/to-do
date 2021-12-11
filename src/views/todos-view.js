class ToDosView {
    mainSection;
    toDosSection;

    constructor(pubSub) {
        this.pubSub = pubSub;

        const content = this.getElement('#content');

        this.mainSection = this.createElement('div');
        this.mainSection.id = 'main-section';

        this.toDosSection = this.createElement('div');
        this.toDosSection.id = 'todos-section';

        content.append(this.mainSection);
    }

    subscribeView() {
        this.pubSub.subscribe('display-list', this.displayList.bind(this));
        this.pubSub.subscribe('display-todos', this.displayToDos.bind(this));
        this.pubSub.subscribe('delete-list', this.deleteToDos.bind(this));

        this.applyEventListeners();
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

    removeChildNodes(parentNode) {
        while (parentNode.firstChild) {
            parentNode.removeChild(parentNode.firstChild);
        }
        
    }

    displayList(msg, list) {
        this.removeChildNodes(this.mainSection);
        this.removeChildNodes(this.toDosSection);

        this.mainSection.className = list.id;

        const addToDoDiv = this.createElement('div');
        addToDoDiv.id = 'main-section-add-todo';

        const iconDiv = this.createElement('div');

        const icon = this.createElement('i', 'fas fa-plus');

        const listHeaderDiv = this.createElement('div');
        listHeaderDiv.id = 'list-header';
        listHeaderDiv.style.color = list.color;

        const listHeaderNameDiv = this.createElement('div');
        listHeaderNameDiv.id = 'list-header-name';
        listHeaderNameDiv.innerText = list.name;

        const listHeaderCountDiv = this.createElement('div');
        listHeaderCountDiv.id = 'list-header-count';
        listHeaderCountDiv.innerText = list.numToDos;

        iconDiv.append(icon);
        addToDoDiv.append(iconDiv);

        listHeaderDiv.append(listHeaderNameDiv);
        listHeaderDiv.append(listHeaderCountDiv);

        this.mainSection.append(addToDoDiv);
        this.mainSection.append(listHeaderDiv);
        this.mainSection.append(this.toDosSection);
    }

    displayEditableToDo(todoContainer, todoData) {
        this.removeChildNodes(todoContainer);

        const newTodoTitleRow = this.createElement('div', 'new-todo-title-row');
        const newTodoCheckbox = this.createElement('div', 'new-todo-checkbox');
        const newTodoTitle = this.createElement('div', 'new-todo-title');
        const newTodoTitleInput = this.createElement('input');
        newTodoTitleInput.type = 'text';
        if (todoData && todoData.title) { newTodoTitleInput.value = todoData.title; }

        const newTodoNotesRow = this.createElement('div', 'new-todo-notes-row');
        const newTodoNotes = this.createElement('div', 'new-todo-notes');
        const newTodoNotesInput = this.createElement('input');
        newTodoNotesInput.type = 'text';
        (todoData && todoData.notes) ? newTodoNotesInput.value = todoData.notes : newTodoNotesInput.placeholder = 'Notes';

        const newTodoDateRow = this.createElement('div', 'new-todo-date-row');
        const newTodoDate = this.createElement('div', 'new-todo-date');
        const newTodoDateInput = this.createElement('input');
        newTodoDateInput.type = 'date';
        if (todoData && todoData.dueDate) { newTodoDateInput.value = todoData.dueDate }

        newTodoTitle.append(newTodoTitleInput);
        newTodoTitleRow.append(newTodoCheckbox);
        newTodoTitleRow.append(newTodoTitle);

        newTodoNotes.append(newTodoNotesInput);
        newTodoNotesRow.append(newTodoNotes);

        newTodoDate.append(newTodoDateInput);
        newTodoDateRow.append(newTodoDate);

        todoContainer.append(newTodoTitleRow);
        todoContainer.append(newTodoNotesRow);
        todoContainer.append(newTodoDateRow);
    }

    createToDo(todo) {
        const todoDiv = this.createElement('div', 'todo');
        todoDiv.id = todo.id;

        const todoTitleRow = this.createElement('div', 'todo-title-row');
        const todoCheckbox = this.createElement('div', 'todo-checkbox');
        const todoTitle = this.createElement('div', 'todo-title');
        todoTitle.innerText = todo.title;

        todoTitleRow.append(todoCheckbox);
        todoTitleRow.append(todoTitle);
        todoDiv.append(todoTitleRow);

        if (todo.notes) {
            const todoNotesRow = this.createElement('div', 'todo-notes-row');
            const todoNotes = this.createElement('div', 'todo-notes');
            todoNotes.innerText = todo.notes;
            todoNotesRow.append(todoNotes);
            todoDiv.append(todoNotesRow);
        }

        if (todo.dueDate) {
            const todoDateRow = this.createElement('div', 'todo-date-row');
            const todoDate = this.createElement('div', 'todo-date');
            todoDate.innerText = todo.dueDate;
            todoDateRow.append(todoDate);
            todoDiv.append(todoDateRow);
        }  

        this.toDosSection.append(todoDiv);
    }

    displayToDos(msg, todoData) {
        this.removeChildNodes(this.toDosSection);
    
        if (todoData.todos.length > 0) {
            todoData.todos.forEach(todo => {
                if (todo.listId === parseInt(this.mainSection.className)) {
                    this.createToDo(todo);
                }
            });  
        }

        this.mainSection.append(this.toDosSection);
    }

    deleteToDos(msg, list) {
        if (list.id === parseInt(this.mainSection.className)) {
            this.removeChildNodes(this.mainSection);
        }
    }

    getToDoValues(todoContainer) {
        const todoData = {};
        if (todoContainer.querySelector('.todo-title')) {
            todoData.title = todoContainer.querySelector('.todo-title').innerText;
        }
        if (todoContainer.querySelector('.todo-notes')) {
                todoData.notes = todoContainer.querySelector('.todo-notes').innerText;
        }
        if (todoContainer.querySelector('.todo-date')) {
                todoData.dueDate = todoContainer.querySelector('.todo-date').innerText;
        }
        return todoData;
    }

    getEditableToDoValues(todoContainer) {
        const todoData = {};

        todoData.title = todoContainer.querySelector('.new-todo-title > input').value;
        todoData.notes = todoContainer.querySelector('.new-todo-notes > input').value;
        todoData.dueDate = todoContainer.querySelector('.new-todo-date > input').value;

        return todoData;
    }

    applyEventListeners() {
        this.mainSection.addEventListener('click', ({ target }) => {
            if (target.className === 'todo-title' || target.className === 'todo-notes' || target.className === 'todo-date') {
                const todoContainer = target.parentNode.parentNode;
                const todoData = this.getToDoValues(todoContainer);
                this.displayEditableToDo(todoContainer, todoData);
            }

            if (target.parentNode && target.parentNode.hasAttribute('id')) {
                if (target.parentNode.id === 'main-section-add-todo') {
                    const newTodoDiv = this.createElement('div', 'todo');
                    this.toDosSection.append(newTodoDiv);
                    this.displayEditableToDo(newTodoDiv);
                }
            }

            if (target.parentNode.parentNode && target.parentNode.parentNode.hasAttribute('id')) {
                if (target.parentNode.parentNode.id === 'main-section-add-todo') {
                    const newTodoDiv = this.createElement('div', 'todo');
                    this.toDosSection.append(newTodoDiv);
                    this.displayEditableToDo(newTodoDiv);
                }
            }
            
            if (target.className === 'todo-checkbox') {
                const todoContainer = target.parentNode.parentNode;
                const toDoData = this.getToDoValues(todoContainer);
                toDoData.listId = parseInt(this.mainSection.className);
                toDoData.todoId = parseInt(todoContainer.id);
                this.pubSub.publish('remove-todo', toDoData);
            }
        });

        this.mainSection.addEventListener('keypress', (event) => {
            const target = event.target;
            if (target.parentNode && (target.parentNode.className === 'new-todo-title' || target.parentNode.className === 'new-todo-notes')) {
                if (event.key === 'Enter') {
                    const todoContainer = target.parentNode.parentNode.parentNode;
                    const toDoData = this.getEditableToDoValues(todoContainer);
                    toDoData.listId = parseInt(this.mainSection.className);
                    if (todoContainer.hasAttribute('id')) {
                        toDoData.todoId = parseInt(todoContainer.id);
                        this.pubSub.publish('edit-todo', toDoData);
                    } else {
                        this.pubSub.publish('add-todo', toDoData);
                    }
                }
            }
            
        });        
    }
}

export default ToDosView;