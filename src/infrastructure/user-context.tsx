import { createContext, useState } from "react";
import { User } from "../core/user";

type UserContext = {
    user: User,
    setUser: (user: User) => void,
};

export const UserContext = createContext<UserContext>(undefined);

export function UserContextProvider({children}) {
    const [user, setUser] = useState<User>();

    return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
}