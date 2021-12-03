export default class List {
    #id;
    #name;
    #color;
    #toDos = [];

    constructor(id, name, color) {
        this.#id = id;
        this.#name = name;
        this.#color = color;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get color() {
        return this.#color;
    }

    get numToDos() {
        return this.#toDos.length;
    }

    get toDos() {
        return this.#toDos;
    }

    addToDo(toDo) {
        this.#toDos.push(toDo);
    }

    removeToDo(index) {
        if (index >= 0 && index < this.#toDos.length) {
            this.#toDos.splice(index, 1);
        }
    }
}
