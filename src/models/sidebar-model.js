import List from "./list";

class SidebarModel {
    lists;
    pubSub;
    constructor(pubSub) {
        this.pubSub = pubSub;
        this.lists = JSON.parse(localStorage.getItem('lists') || "[]");
    }

    subscribeModel() {
        this.pubSub.subscribe('add-list', this.addList.bind(this));
    }

    addList(msg, listData) {
        const list = new List(Date.now(), listData.name, listData.color)
        this.lists.push(list);
        this.commit(this.lists);
    }

    commit(lists) {
        this.pubSub.publish('display-lists', lists);

        localStorage.setItem('lists', JSON.stringify(lists));
    }
}

export default SidebarModel;