export default class ToDo {
    #id;
    #listId;
    #title;
    #notes;
    #dueDate;

    constructor(id, listId, title, notes, dueDate) {
        this.#id = id;
        this.#listId = listId;
        this.#title = title;
        this.#notes = notes;
        this.#dueDate = dueDate;
    }

    get id() {
        return this.#id;
    }

    get listId() {
        return this.#listId;
    }

    get title() {
        return this.#title;
    }

    get notes() {
        return this.#notes;
    }

    get dueDate() {
        return this.#dueDate;
    }

    set title(title) {
        this.#title = title;
    }

    set notes(notes) {
        this.#notes = notes;
    }

    set dueDate(dueDate) {
        this.#dueDate = dueDate;
    }
}