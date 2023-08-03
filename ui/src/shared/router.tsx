import { createContext, useContext, useEffect, useState } from "react";
import { BaseLayout } from "./base-layout";
import { useCaparisApp } from "./caparis-app-context";
import { Text } from "./text";

const routes: Route[] = [];

export interface Route {
    url: string;
    render: any;
}

export function addRoute(url: string, render: any) {
    routes.push({ url, render });
}

const RouterContext = createContext({
    currentRoute: '',
    navigateTo: (route: string, params?: any) => { },
    push: (route: string, params?: any) => { },
    pop: () => { },
    currentParams: {} as any
});

export function RouterContextProvider({ children, defaultRoute, unauthenticatedRoute }) {
    const { userRepository } = useCaparisApp().Dependencies;
    const [history, setHistory] = useState<string[]>([]);
    const [currentRoute, setCurrentRoute] = useState<string>(defaultRoute);
    const [currentParams, setCurrentParams] = useState<any>({});

    useEffect(() => {
        if (userRepository.currentUser$.value == null || userRepository.currentUser$.value == undefined)
            setCurrentRoute(unauthenticatedRoute);
    }, []);

    const navigateTo = (route: string, params?: any) => {
        setHistory([route]);
        setCurrentRoute(route);
        setCurrentParams(params);
    }

    const push = (route: string, params?: any) => {
        setHistory([...history, route]);
        navigateTo(route, params);
    }

    const pop = () => {
        alert(history)
        history.pop();
        navigateTo(history[history.length - 1], currentParams);
    }

    return <RouterContext.Provider value={{ currentRoute, navigateTo, push, pop, currentParams }}>{children}</RouterContext.Provider>

}

export function useRouter() {

    return useContext(RouterContext);
}

export function Router() {
    const { currentRoute } = useContext(RouterContext);

    const screen = routes.find(c => c.url.toLowerCase() == currentRoute.toLowerCase());

    if (!screen)
        return <BaseLayout>
            <Text type="default">Route not registered</Text></BaseLayout>

    const Element = screen?.render;
    return <BaseLayout>
        {Element}
    </BaseLayout>;
}