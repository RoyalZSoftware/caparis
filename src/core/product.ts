import { differenceInDays} from 'date-fns';
import { UserScopedModel } from "./user-scoped";

export class Product extends UserScopedModel {
    public id: string;
    public name: string;
    public productIdentifier: string;
    public expiryDate: Date;
    public quantity: number;

    public get willExpireSoon(): boolean {
        return this._calculateDaysBetweenExpiryAndNow() <= 3;
    }

    protected _calculateDaysBetweenExpiryAndNow(): number {
        return differenceInDays(this.expiryDate, new Date(Date.now())) + 1;
    }

    public get expiryDateColor(): 'error' | 'primary' {
        return this.willExpireSoon ? 'error' : 'primary';
    }

    public get expireInDays(): number {
        return this._calculateDaysBetweenExpiryAndNow();
    }
}
