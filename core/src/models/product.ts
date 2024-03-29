import { differenceInDays} from 'date-fns';
import { BoundsValidator, Guardable, GuardClause, PresenceValidator } from './validation';

export class ProductId {
    constructor(public value: string) {}
}

export class Product extends Guardable<Product> {

    get guards(): GuardClause<Product>[] {
        return [
            new GuardClause(c => c.name.length, [PresenceValidator, BoundsValidator(2, 180)]),
            new GuardClause(c => c.quantity, [PresenceValidator, BoundsValidator(1, 999)]),
            new GuardClause(c => c.createdById, [PresenceValidator]),
        ];
    }

    public id: ProductId;
    public name: string;
    public quantity: number;
    public createdById: string;

    public expiryDate?: Date;
    public productIdentifier?: string;
    public imageUrl?: string;

    constructor(createdById: string, name: string, quantity: number, productIdentifier: string = null, expiryDate: Date = null) {
        super();
        this.createdById = createdById;
        this.name = name;
        this.productIdentifier = productIdentifier;
        this.expiryDate = expiryDate;
        this.quantity = quantity;
        this.guard();
    }

    public willExpireSoon(): boolean {
        return this.expireInDays() <= 3;
    }

    public expiryDateColor(): 'error' | 'primary' {
        return this.willExpireSoon ? 'error' : 'primary';
    }

    public expireInDays(): number {
        return this._calculateDaysBetweenExpiryAndNow();
    }

    private _calculateDaysBetweenExpiryAndNow(): number {
        return differenceInDays(this.expiryDate, new Date(Date.now())) + 1;
    }
}
