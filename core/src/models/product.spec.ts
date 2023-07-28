import { Product } from "./product"

function buildValidProduct(): Product {
    return new Product("1", "Tomato", 1);
}

describe("ProductGuards", () => {
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
})