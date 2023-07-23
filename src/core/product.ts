import { differenceInDays} from 'date-fns';

export class ProductId {
    constructor(public value: string) {}
}

export class Product {
    public id: ProductId;
    public name: string;
    public productIdentifier: string;
    public expiryDate: Date;
    public quantity: number;
    createdById: string;

    constructor(createdById: string, name: string, quantity: number, productIdentifier: string = null, expiryDate: Date = null) {
        this.createdById = createdById;
        this.name = name;
        this.productIdentifier = productIdentifier;
        this.expiryDate = expiryDate;
        this.quantity = quantity;
    }

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
