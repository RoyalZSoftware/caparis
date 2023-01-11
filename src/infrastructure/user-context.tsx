import { createContext, useContext, useState } from "react";
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

type UserContext = {
    user: FirebaseAuthTypes.User,
    setUser: (user: FirebaseAuthTypes.User) => void,
};

export const UserContext = createContext<UserContext>(undefined);

export function UserContextProvider({children}) {
    const [user, setUser] = useState<FirebaseAuthTypes.User>();

    return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
}