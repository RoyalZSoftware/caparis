import { BehaviorSubject, from, map, Observable, tap } from "rxjs";
import { User } from "@caparis/core";
import { EmailPasswordLoginProvider, UserRepository } from "@caparis/core";
import { AppWriteClient } from "./appwrite";

export class AppWriteUserRepository implements UserRepository, EmailPasswordLoginProvider {
    
    constructor() {
        from(AppWriteClient.provider().account.get()).pipe(
            tap((user) => {
                this.currentUser$.next({displayName: user.name, email: user.email, uid: user.$id});
            })
        );
    }

    signInWithEmailAndPassword(email: string, password: string): Observable<User> {
        return AppWriteClient.login(email, password).pipe(
            map((c) => ({
                uid: c.userId,
                displayName: c.clientName,
                email: c.provider,
            }))
        );
    }
    currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    signOut: () => Observable<void>;
}