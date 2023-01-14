import { useContext, useState } from "react";
import auth from '@react-native-firebase/auth';
import { from, tap } from "rxjs";
import { UserContext } from "../infrastructure/user-context";

export default function useFirebaseAuth() {
    const [initializing, setInitializing] = useState(true);

    const {user, setUser} = useContext(UserContext);

    auth().onAuthStateChanged((user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    });

    const signIn = (email, password) => {
        return from(auth().signInWithEmailAndPassword(email, password)).pipe(tap((userResponse) => {
            setUser(userResponse.user);
        }));
    }

    const signOut = () => {
        return from(auth().signOut());
    }

    return {signIn, user, initializing, signOut};
}