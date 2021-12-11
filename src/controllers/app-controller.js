class AppController {
    #listsView;
    #listsModel;
    #todosView;
    #todosModel;

    constructor(listsView, listsModel, todosView, todosModel) {
        this.#listsView = listsView;
        this.#listsModel = listsModel;
        this.#todosView = todosView;
        this.#todosModel = todosModel;
    }

    init() {
        this.#listsView.subscribeView();
        this.#todosView.subscribeView();
        this.#listsModel.subscribeModel();
        this.#todosModel.subscribeModel();
        
    }
}

export default AppController;