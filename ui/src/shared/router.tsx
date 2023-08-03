import { Context } from "@caparis/core";
import { createContext, useContext, useEffect, useState } from "react";
import { BaseLayout } from "./base-layout";
import { Text } from "./text";

const routes: Route[] = [];

let unauthenticatedRoute: Route;
export const setUnauthenticatedPage = (route: Route) => {
    unauthenticatedRoute = route;
}

export interface Route {
    title: string;
    url: string;
    render: any;
}

export function addRoute(route: Route) {
    routes.push(route);
}

const RouterContext = createContext({ currentRoute: null as Route, navigateTo: (route: Route, params?: any) => { }, currentParams: {} as any});

export function RouterContextProvider({ children, defaultRoute }) {
    const [currentRoute, setCurrentRoute] = useState<Route>(defaultRoute);
    const [currentParams, setCurrentParams] = useState<any>({});

    const {userRepository} = Context.Dependencies;

    useEffect(() => {
        if (userRepository.currentUser$.value == null || userRepository.currentUser$.value == undefined)
            setCurrentRoute(unauthenticatedRoute);
    }, []);

    const navigateTo = (route: Route, params?: any) => {
        setCurrentRoute(route);
        setCurrentParams(params);
    }

    return <RouterContext.Provider value={{ currentRoute, navigateTo, currentParams }}>{children}</RouterContext.Provider>
}

export function useRouter() {

    return useContext(RouterContext);
}

export function Router() {
    const { currentRoute } = useContext(RouterContext);

    if (!currentRoute)
        return <BaseLayout>
            <Text type="default">Route not registered</Text></BaseLayout>

    const Element = currentRoute?.render;
    return <BaseLayout>
    {Element}
    </BaseLayout>;
}