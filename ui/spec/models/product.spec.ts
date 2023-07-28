import { addDays } from "date-fns";
import { ProductListItemBase } from "../../src/ui/components/product-list-item";
import { Product } from "../../src/data-provider/models/product";

const defineProductFactory = () => {
    let invocations = 0;
    return (overrides?: Partial<{ [Key in keyof Product]: any }>) => {
        return Product.create({
            id: invocations++,
            createdById: '1',
            expiryDate: new Date(),
            name: `Product ${invocations}`,
            productIdentifier: '42143949',
            quantity: 1,
            ...overrides,
        });
    }
}

const createProduct = defineProductFactory();


describe('Product', () => {
    it('has a field for prettified expiry date', () => {
        const product = createProduct({expiryDate: addDays(new Date(Date.now()), 3)});
        expect(product.decorate().expireInDays).toEqual(3);
    });
    it('ExpiryDateColor will be red if willExpireSoonIsTrue', () => {
        const product = createProduct({expiryDate: addDays(new Date(Date.now()), 1)});
        expect(product.decorate().expiryDateColor).toEqual('error');
    })

    describe('Categorizing as expiring soon', () => {
        it('Product is categorized as expiring soon if expiryDate is less than 3 days away', () => {
            const TwoDaysFromNow = addDays(new Date(Date.now()), 2.1);
            const product = createProduct({ expiryDate: TwoDaysFromNow })

            expect(product.willExpireSoon).toEqual(true);
        });

        it('is not categorized as expiring soon if expiryDate is more than 3 days away', () => {
            const FourDaysFromNow = addDays(new Date(Date.now()), 4)

            const product = createProduct({ expiryDate: FourDaysFromNow })

            expect(product.willExpireSoon).toEqual(false);
        });
    })
});