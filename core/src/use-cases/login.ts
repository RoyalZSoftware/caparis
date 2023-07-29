import { tap } from "rxjs";
import { Context } from "../deps";

export class CaparisLoginMethodNotSupportedError extends Error { }

export function loginWithEmailAndPassword(email: string, password: string) {
    const { userRepository } = Context.Dependencies;
    return userRepository.authProvider()[0].signIn({email: email, password: password})
        .pipe(tap((user: any) => {
            userRepository.currentUser$.next(user);
        }));
}