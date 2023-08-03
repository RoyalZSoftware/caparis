import { addRoute } from "../../shared/router";
import LoginScreen from "./login";

export interface AuthModuleConfig {
    successfulLoginCallbackRoute: string,
}

export const LoginRoute = '/login';

export function initializeAuth(config: AuthModuleConfig) {
    addRoute('/login', <LoginScreen successfulLoginCallbackRoute={config.successfulLoginCallbackRoute}></LoginScreen>);
}