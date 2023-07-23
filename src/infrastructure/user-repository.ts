import { Observable } from "rxjs";
import { User } from "../core/user";

export interface EmailPasswordLoginProvider {
    signInWithEmailAndPassword(email: string, password: string): Observable<any>;
}

export interface UserRepository {
    currentUser: User;
    signOut: () => Observable<void>;
}