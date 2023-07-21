import { useState } from "react";
import auth from '@react-native-firebase/auth';
import { from, tap } from "rxjs";
import { useDependencies } from "../infrastructure/deps";

export default function useFirebaseAuth() {
    const [initializing, setInitializing] = useState(true);

    const {userRepository} = useDependencies();

    auth().onAuthStateChanged((user) => {
        userRepository.currentUser = user;
        if (initializing) setInitializing(false);
    });

    const signIn = (email, password) => {
        return from(auth().signInWithEmailAndPassword(email, password)).pipe(tap((userResponse) => {
            userRepository.currentUser = userResponse.user;
        }));
    }

    const signOut = () => {
        return from(auth().signOut());
    }

    return {signIn, user: userRepository.currentUser, initializing, signOut};
}