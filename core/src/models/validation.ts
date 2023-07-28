export function PresenceValidator(c: any) {
    if (c == undefined || c == null || (c instanceof String && c.length == 0))
        throw new Error("Field is not present.");
}

export function BoundsValidator(minLength: number = undefined, maxLength: number = undefined) {
    return (c: number) => {
        if (!!minLength && c < minLength)
            throw new Error("Field has to be at least " + minLength + " long.");
        if (!!maxLength && c > maxLength)
            throw new Error("Field can't exceed " + minLength);
    }
}

export class GuardClause<T> {
    constructor(public predicate: (c: T) => any, public validators: ((c: any) => any)[]) {
    }

    public validate(c: T) {
        this.validators.forEach((validate) => {
            const value = this.predicate(c);
            try {
                validate(value);
            } catch (e) {
                e.message = this.predicate.toString() + ": " + e.message;
                throw e;
            }
        })
    }
}

export abstract class Guardable<T> {
    abstract get guards(): GuardClause<T>[];

    guard() {
        this.guards.forEach(guard => {
            guard.validate(this as any as T);
        });
    }

}