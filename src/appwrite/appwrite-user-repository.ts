import { Observable } from "rxjs";
import { User } from "../core/user";
import { EmailPasswordLoginProvider, UserRepository } from "../infrastructure/user-repository";
import { AppWriteClient } from "./appwrite";

export class AppWriteUserRepository implements UserRepository, EmailPasswordLoginProvider {
    signInWithEmailAndPassword(email: string, password: string): Observable<any> {
        return AppWriteClient.login(email, password);
    }
    currentUser: User = {displayName: 'Alexander Panov', email: 'panov@royalzsoftware.de', uid: '000'};
    signOut: () => Observable<void>;
}