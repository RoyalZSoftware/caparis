import { addRoute } from "../../shared/router";
import { DetailsScreen } from "./details";
import HomeScreen from "./home";
import { InventoryScreen } from "./inventory";
import { DetailsRoute, HomeRoute, InventoryRoute } from "./routes";

export function initializeAnalyse() {
    addRoute(InventoryRoute, <InventoryScreen></InventoryScreen>)
    addRoute(HomeRoute, <HomeScreen></HomeScreen>);
    addRoute(DetailsRoute, <DetailsScreen></DetailsScreen>);
}
