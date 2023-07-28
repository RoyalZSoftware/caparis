import { Context } from "@caparis/core";
import { createContext, useContext, useEffect, useState } from "react";
import HomeScreen from "../screens/home";
import { InventoryScreen } from "../screens/inventory";
import LoginScreen from "../screens/login";

const routes = [{
    url: '/home',
    title: 'Home',
}, {
    url: '/login',
}];

const RouterContext = createContext({currentUrl: null, setCurrentUrl: null});

export function RouterContextProvider({children}) {
    const [currentUrl, setCurrentUrl] = useState('/login');

    const {userRepository} = Context.Dependencies;

    useEffect(() => {
        const authGuardRedirect = () => {
            if (userRepository?.currentUser$.value == undefined) {
                return '/login';
            }
            if (currentUrl == '/login' && userRepository.currentUser$.value != undefined) {
                return '/home';
            }
            return null;
        }

        if (authGuardRedirect() != null) {
            setCurrentUrl(authGuardRedirect());
            return;
        }
    }, [userRepository.currentUser$])

    return <RouterContext.Provider value={{currentUrl, setCurrentUrl}}>{children}</RouterContext.Provider>
}

export function useRouter() {
    return useContext(RouterContext);
}

export function Router() {
    const {currentUrl} = useContext(RouterContext);

    switch(currentUrl) {
        case '/home':
            return <HomeScreen></HomeScreen>;
        case '/inventory':
            return <InventoryScreen></InventoryScreen>;
        default:
        case '/login':
            return <LoginScreen></LoginScreen>;
    }
}