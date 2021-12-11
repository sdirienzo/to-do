import List from "./list";

class ListsModel {
    pubSub;
    lists = [];
    constructor(pubSub) {
        this.pubSub = pubSub;
        
        let listsFromStorage = JSON.parse(localStorage.getItem('lists') || "[]");

        if (listsFromStorage.length > 0) {
            listsFromStorage.forEach(list => {
                let listFromStorage = new List(list.id, list.name, list.color);
                if (list.toDos.length > 0) {
                    list.toDos.forEach(listTodoId => {
                        listFromStorage.addToDo(listTodoId);
                    });
                }
                this.lists.push(listFromStorage);
            });
        }
    }

    subscribeModel() {
        this.pubSub.subscribe('add-list', this.addList.bind(this));
        this.pubSub.subscribe('delete-list', this.deleteList.bind(this));
        this.pubSub.subscribe('add-todo-to-list', this.addToDo.bind(this));
        this.pubSub.subscribe('remove-todo-from-list', this.removeToDo.bind(this));

        if (this.lists.length === 0) {
            const defaultList = {};
            defaultList.name = 'Reminders';
            defaultList.color = '#FF9F0C';
            this.pubSub.publish('add-list', defaultList);
        } else {
            this.pubSub.publish('display-list', this.lists[0]);
            this.pubSub.publish('display-lists', this.lists);
        }
    }

    addList(msg, listData) {
        const list = new List(Date.now(), listData.name, listData.color);
        this.lists.push(list);
        this.pubSub.publish('display-list', list);
        this.pubSub.publish('display-lists', this.lists);
        this.commit();
    }

    deleteList(msg, listData) {
        this.lists.forEach((list, index) => {
            if (list.id === listData.id) {
                this.lists.splice(index, 1);
            }
        });
        this.pubSub.publish('display-lists', this.lists);
        this.commit();
    }

    addToDo(msg, todoData) {
        this.lists.forEach(list => {
            if (list.id === todoData.listId) {
                list.addToDo(todoData.id);
                this.pubSub.publish('display-list', list);
            }
        });
        this.pubSub.publish('display-lists', this.lists);
        this.commit();
    }

    removeToDo(msg, todoData) {
        this.lists.forEach(list => {
            if (list.id === todoData.listId) {
                list.toDos.forEach((todoId, index) =>  {
                    if (todoId === todoData.id) {
                        list.removeToDo(index);
                        this.pubSub.publish('display-list', list);
                    }
                });
            }
        }); 
        this.pubSub.publish('display-lists', this.lists);
        this.commit();
    }

    commit() {       
        let lists = [];

        this.lists.forEach(list => {
            let listForStorage = {};
            listForStorage.id = list.id;
            listForStorage.name = list.name;
            listForStorage.color = list.color;
            listForStorage.toDos = [];
            if (list.toDos.length > 0) {
                list.toDos.forEach(todoId => {
                    listForStorage.toDos.push(todoId);
                });
            }

            lists.push(listForStorage);
        });

        localStorage.setItem('lists', JSON.stringify(lists));
    }
}

export default ListsModel;