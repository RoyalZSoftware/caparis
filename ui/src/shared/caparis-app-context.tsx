import { CaparisApp } from '@caparis/core';
import { AppWriteDependencies } from '@caparis/appwrite';
import { createContext, useContext } from "react";

export const CaparisAppContext = createContext({} as CaparisApp);

export function useCaparisApp() : CaparisApp {
  return useContext(CaparisAppContext);
}

export function CaparisAppProvider({children}) {
  const caparisApp = new CaparisApp(AppWriteDependencies('products', 'products'));
  return <CaparisAppContext.Provider value={caparisApp}>{children}</CaparisAppContext.Provider>
}
