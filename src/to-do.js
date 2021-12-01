export default class ToDo {
    #title;
    #notes;
    #dueDate;

    constructor(title, notes, dueDte) {
        this.#title = title;
        this.#notes = notes;
        this.#dueDate = dueDte;
    }

    get title() {
        return this.#title;
    }

    get notes() {
        return this.#notes;
    }

    get dueDte() {
        return this.#dueDate;
    }

    set title(title) {
        this.#title = title;
    }

    set notes(notes) {
        this.#notes = notes;
    }

    set dueDte(dueDate) {
        this.#dueDate = dueDate;
    }
}