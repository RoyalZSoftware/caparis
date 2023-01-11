import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Button from "../components/button";
import useFirebaseAuth from "../data-provider/firebase-auth";
import { getRepository } from 'fireorm';

import { from } from "rxjs";
import { Product, useProductProvider } from "../data-provider/models/product";
import List from "../components/list";
import { ProductListItem } from "../components/product-list-item";

export default function LoginScreen() {
    
    const auth = useFirebaseAuth();
    const productProvider = useProductProvider();

    const [products, setProducts] = useState<Product[]>();

    useEffect(() => {
    
        auth.signIn().then((data) => {
            console.log(data.user.uid);
            productProvider.getAllProductsForUser(data.user).subscribe((p) => {
                setProducts(p);
            });
        });

    }, []);

    return (
        <View>
            <Text>{auth.user?.email ?? 'Nicht angemeldet'}</Text>
            <View>
                <List items={products?.map(c => new ProductListItem(c))}></List>
            </View>
            <Button title={'Hallo'} onPress={() => {
                productProvider.createProduct(new Product(
                    "Test",
                    "123",
                    new Date(),
                    auth.user.uid
                )).subscribe((p) => {
                    setProducts([]);
                });

            }}></Button>
        </View>);

}