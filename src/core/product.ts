import { differenceInDays} from 'date-fns';
import { Collection, Ignore } from 'fireorm';
import { UserScopedModel } from "./user-scoped";

@Collection('Products')
export class Product extends UserScopedModel {
    public id: string;
    public name: string;
    public productIdentifier: string;
    public expiryDate: Date;
    public quantity: number;

    public willExpireSoon(): boolean {
        return this._calculateDaysBetweenExpiryAndNow() <= 3;
    }

    protected _calculateDaysBetweenExpiryAndNow(): number {
        return differenceInDays(this.expiryDate, new Date(Date.now())) + 1;
    }

    public expiryDateColor(): 'error' | 'primary' {
        return this.willExpireSoon ? 'error' : 'primary';
    }

    public expireInDays(): number {
        return this._calculateDaysBetweenExpiryAndNow();
    }
}
