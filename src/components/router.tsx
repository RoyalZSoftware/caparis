import { createContext, useContext, useEffect, useState } from "react";
import { useDependencies } from "../infrastructure/deps";
import HomeScreen from "../screens/home";
import LoginScreen from "../screens/login";

const routes = [{
    url: '/home',
    title: 'Home',
}, {
    url: '/login',
}];

const RouterContext = createContext({currentUrl: null, setCurrentUrl: null});

export function RouterContextProvider({children}) {
    const [currentUrl, setCurrentUrl] = useState('/home');

    const {userRepository} = useDependencies();

    useEffect(() => {
        if (userRepository.currentUser == undefined) {
            setCurrentUrl('/login');
        }
        if (currentUrl == '/login' && userRepository.currentUser != undefined) {
            setCurrentUrl('/home');
        }
    }, [currentUrl])

    return <RouterContext.Provider value={{currentUrl, setCurrentUrl}}>{children}</RouterContext.Provider>
}

export function Router() {
    const {currentUrl} = useContext(RouterContext);

    return <>
    {currentUrl == '/login' ? <LoginScreen></LoginScreen> : <HomeScreen></HomeScreen>}
    </>;
}