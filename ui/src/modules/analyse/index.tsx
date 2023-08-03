import { addRoute } from "../../shared/router";
import { DetailsRoute } from "./details";
import { HomeRoute } from "./home";
import { InventoryRoute } from "./inventory";

export function initializeAnalyse() {
    addRoute(InventoryRoute);
    addRoute(HomeRoute);
    addRoute(DetailsRoute);
}

export {InventoryRoute} from './inventory';
export {HomeRoute} from './home';