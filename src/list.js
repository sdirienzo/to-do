export default class List {
    #name;
    #color;
    #toDos = [];

    constructor(name, color) {
        this.#name = name;
        this.#color = color;
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
