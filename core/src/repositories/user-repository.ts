import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user";

export interface AuthProvider<AuthPayload> {
    name: string;
    signIn: (payload: AuthPayload) => Observable<User>;
}

export interface UserRepository {
    currentUser$: BehaviorSubject<User>;
    signOut: () => Observable<void>;
    authProvider(): AuthProvider<any>[];
}