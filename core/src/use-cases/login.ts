import { tap } from "rxjs";
import { Context } from "../deps";
import { canSignInWithEmailAndPassword } from "../repositories/user-repository";

export class CaparisLoginMethodNotSupportedError extends Error { }

export function loginWithEmailAndPassword(email: string, password: string) {
    const { userRepository } = Context.Dependencies;
    if (canSignInWithEmailAndPassword(userRepository)) {
        return userRepository.signInWithEmailAndPassword(email, password)
            .pipe(tap((user: any) => {
                userRepository.currentUser$.next(user);
            }));
    }

    throw new CaparisLoginMethodNotSupportedError();
}