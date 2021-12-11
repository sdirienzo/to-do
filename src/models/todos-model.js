import ToDo from "./to-do";

class ToDosModel {
    pubSub;
    todos = [];

    constructor(pubSub) {
        this.pubSub = pubSub;

        let todosFromStorage = JSON.parse(localStorage.getItem('todos') || "[]");

        if (todosFromStorage.length > 0) {
            todosFromStorage.forEach(todo => {
                this.todos.push(new ToDo(todo.id, todo.listId, todo.title, todo.notes, todo.dueDate));
            });
            
        }
    }

    subscribeModel() {
        this.pubSub.subscribe('add-todo', this.addToDo.bind(this));
        this.pubSub.subscribe('remove-todo', this.removeToDo.bind(this));
        this.pubSub.subscribe('edit-todo', this.editToDo.bind(this));
        this.pubSub.subscribe('delete-list', this.deleteToDos.bind(this));
        this.pubSub.subscribe('display-list', this.sendListToDos.bind(this));
    }

    getListToDos(listId) {
        let todos = [];
        this.todos.forEach(todo => {
            if (todo.listId === listId) {
                todos.push(todo);
            }
        });
        return todos;
    }

    sendListToDos(msg, list) {
        let payload = {};
        payload.listId = list.id;
        payload.todos = this.getListToDos(list.id);
        this.pubSub.publish('display-todos', payload);
        this.commit();
    }

    addToDo(msg, todoData) {
        const todo = new ToDo(Date.now(), todoData.listId, todoData.title, todoData.notes, todoData.dueDate);
        this.todos.push(todo);

        let payload = {};
        payload.listId = todoData.listId;
        payload.todos = this.getListToDos(todoData.listId);
        this.pubSub.publish('display-todos', payload);
        this.pubSub.publish('add-todo-to-list', todo);
        this.commit();
    }

    editToDo(msg, todoData) {
        this.todos.forEach(todo => {
            if (todo.id === todoData.todoId) {
                if (todoData.hasOwnProperty('title')) {
                    todo.title = todoData.title;
                }
                if (todoData.hasOwnProperty('notes')) {
                    todo.notes = todoData.notes;
                }
                if (todoData.hasOwnProperty('dueDate')) {
                    todo.dueDate = todoData.dueDate;
                }
            }
        });
        let payload = {};
        payload.listId = todoData.listId;
        payload.todos = this.getListToDos(todoData.listId);
        this.pubSub.publish('display-todos', payload);
        this.commit();
    }

    removeToDo(msg, todoData) {
        this.todos.forEach((todo, index) => {
            if (todo.id === todoData.todoId) {
                this.todos.splice(index, 1);
                this.pubSub.publish('remove-todo-from-list', todo);
            }
        });
        let payload = {};
        payload.listId = todoData.listId;
        payload.todos = this.getListToDos(todoData.listId);
        this.pubSub.publish('display-todos', payload);
        this.commit();
    }

    deleteToDos(msg, list) {
        this.todos.forEach((todo, index) => {
            if (todo.listId === list.id) {
                this.todos.splice(index, 1);
            }
        });
        this.commit();
    }

    commit() {
        let todos = [];
        this.todos.forEach(todo => {
            let todoForStorage = {};
            todoForStorage.id = todo.id;
            todoForStorage.listId = todo.listId;
            todoForStorage.title = todo.title;
            todoForStorage.notes = todo.notes;
            todoForStorage.dueDate = todo.dueDate;
            todos.push(todoForStorage);
        });

        localStorage.setItem('todos', JSON.stringify(todos));
    }

}

export default ToDosModel;