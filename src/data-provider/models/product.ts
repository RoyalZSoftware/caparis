import { Collection } from "fireorm";

@Collection('Products')
export class Product {
    id: string;
    name: string;
    barcodeIdentifier: string;
    expiryDate: string;
}