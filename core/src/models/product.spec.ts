import { Product } from "./product"

function buildValidProduct(): Product {
    return new Product("1", "Tomato", 1);
}

describe("ProductGuards", () => {
    it("CreatedById guards", () => {
        const product = buildValidProduct();
        product.createdById = null;
        expect(() => {
            product.guard();
        }).toThrowError();
    });
    it("Name guards", () => {
        const product = buildValidProduct();

        product.name = "";
        expect(() => {
            product.guard()
        }).toThrowError();

        product.name = "Asdf";
        expect(() => {
            product.guard()
        }).not.toThrowError();
    })
    it("Quantity guards", () => {
        const product = buildValidProduct();

        expect(() => {
            product.guard();
        }).not.toThrowError();

        product.quantity = 1230;

        expect(() => {
            product.guard();
        }).toThrowError();
    });
})