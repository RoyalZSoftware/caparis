import { useState } from "react";
import auth from '@react-native-firebase/auth';

export default function useFirebaseAuth() {
    const [initializing, setInitializing] = useState(true);

    const [user, setUser] = useState<any>();

    auth().onAuthStateChanged((user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    });

    const signIn = () => {
        return auth().signInWithEmailAndPassword('panov@royalzsoftware.de', 'Test123')
    }

    const signOut = () => {
        return auth().signOut();
    }

    return {signIn, user, initializing, signOut};
}