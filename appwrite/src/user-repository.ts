import { BehaviorSubject, from, map, Observable, of, tap } from "rxjs";
import { User, AuthProvider } from "@caparis/core";
import { UserRepository } from "@caparis/core";
import { AppWriteClient } from "./appwrite";

export class AppWriteUsernamePasswordLogin implements AuthProvider<{email: string, password: string}> {
    name: string = "username";
    
    signIn({email, password}: {email: string, password: string}) {
        return AppWriteClient.login(email, password).pipe(
            map((c) => ({
                uid: c.userId,
                displayName: c.clientName,
                email: c.provider,
            }))
        );
    }
}

export class AppWriteUserRepository implements UserRepository {
    
    constructor() {
        from(AppWriteClient.provider().account.get()).pipe(
            tap((user) => {
                this.currentUser$.next({displayName: user.name, email: user.email, uid: user.$id});
            })
        );
    }

    authProvider() {
        return [
            new AppWriteUsernamePasswordLogin(),
            new AppWriteUsernamePasswordLogin(),
        ];
    }
    currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    signOut: () => Observable<void>;
}