import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ExitStatus } from "typescript";
import Button from "../components/button";
import List from "../components/list";
import { ProductListItem } from "../components/product-list-item";
import useFirebaseAuth from "../data-provider/firebase-auth";
import { Product, useProductProvider } from "../data-provider/models/product";

export default function Inventory() {

    const [loading, setLoading] = useState(true);

    const auth = useFirebaseAuth();

    const productProvider = useProductProvider();

    const [allProducts, setAllProducts] = useState([]);

    const refreshProductList = () => {
        if (auth.user)
            productProvider.getAllProductsForUser(auth.user)
                .subscribe((products) => {
                    setAllProducts(products);
                    setLoading(false);
                });
    }

    const createProduct = (name: string, expiryDate: Date) => {
        const product = new Product();

        product.name = name;
        product.barcodeIdentifier = "BarCodeIdentifier";
        product.expiryDate = expiryDate;
        product.createdById = auth.user.uid;

        productProvider.createProduct(product).subscribe(() => {
            refreshProductList();
        });
    }

    useEffect(refreshProductList, []);

    if (loading) return (<Text>Loading..</Text>);

    return (
        <View>
            <Button onPress={() => createProduct('Testprodukt', new Date())} title={"New"}></Button>
            <List items={allProducts.map(product => new ProductListItem(product))}></List>
        </View>
    );

}