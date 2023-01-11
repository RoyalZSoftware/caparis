import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
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
        productProvider.getAllProductsForUser(auth.user)
            .subscribe((products) => {
                setAllProducts(products);
                setLoading(false);
            });
    }

    const createProduct = (name: string, expiryDate: Date) => {
        productProvider.createProduct(new Product(name, expiryDate.toString(), new Date(), auth.user.uid)).subscribe(() => {
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