import PubSub from "pubsub-js";
import AppController from "./controllers/app-controller";
import ListsView from "./views/lists-view";
import ListsModel from "./models/lists-model";
import ToDosView from "./views/todos-view";
import ToDosModel from "./models/todos-model";
import './styles/style.css';

const pubSub = PubSub;
const app = new AppController(new ListsView(pubSub), new ListsModel(pubSub), new ToDosView(pubSub), new ToDosModel(pubSub));
app.init();
