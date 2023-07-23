import { createContext, useContext, useEffect, useState } from "react";
import { useDependencies } from "../infrastructure/deps";
import Inventory from "../screens/inventory";
import LoginScreen from "../screens/login";

const routes = [{
    url: '/home',
    title: 'Home',
}, {
    url: '/login',
}];

const RouterContext = createContext({currentUrl: null, setCurrentUrl: null});

export function RouterContextProvider({children}) {
    const [currentUrl, setCurrentUrl] = useState('/inventory');

    const {userRepository} = useDependencies();

    useEffect(() => {
        if (userRepository.currentUser == undefined) {
            setCurrentUrl('/login');
        }
        if (currentUrl == '/login' && userRepository.currentUser != undefined) {
            setCurrentUrl('/inventory');
        }
    }, [currentUrl])

    return <RouterContext.Provider value={{currentUrl, setCurrentUrl}}>{children}</RouterContext.Provider>
}

export function Router() {
    const {currentUrl} = useContext(RouterContext);

    return <>
    {currentUrl == '/login' ? <LoginScreen></LoginScreen> : <Inventory></Inventory>}
    </>;
}