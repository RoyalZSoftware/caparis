import { addRoute, Route } from "../../shared/router";
import LoginScreen from "./login";

export interface AuthModuleConfig {
    successfulLoginCallbackRoute: Route,
}

export let moduleConfig: AuthModuleConfig = null;

export const LoginRoute = {
    render: <LoginScreen></LoginScreen>, title: 'Login', url: '/login'
}

export function initializeAuth(config: AuthModuleConfig) {
    addRoute(LoginRoute);
    moduleConfig = config;
}