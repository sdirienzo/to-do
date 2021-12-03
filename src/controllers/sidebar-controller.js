class SidebarController {
    #model;
    #view;
    constructor(model, view) {
        this.#model = model;
        this.#view = view;
    }

    init() {
        this.#view.subscribeView();
        this.#model.subscribeModel();
    }
}

export default SidebarController;