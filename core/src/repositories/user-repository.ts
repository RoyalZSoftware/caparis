import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user";

export interface EmailPasswordLoginProvider {
    signInWithEmailAndPassword(email: string, password: string): Observable<User>;
}

export interface UserRepository {
    currentUser$: BehaviorSubject<User>;
    signOut: () => Observable<void>;
}

export const canSignInWithEmailAndPassword = (t: any): t is EmailPasswordLoginProvider => {
    return "signInWithEmailAndPassword" in t;
}