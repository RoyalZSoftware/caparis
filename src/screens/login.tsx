import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Button from "../components/button";
import useFirebaseAuth from "../data-provider/firebase-auth";

import { switchMap } from "rxjs";
import { Product, useProductProvider } from "../data-provider/models/product";
import List from "../components/list";
import { ProductListItem } from "../components/product-list-item";
import Inventory from "./inventory";

export default function LoginScreen() {
    
    const auth = useFirebaseAuth();
    const productProvider = useProductProvider();

    const [products, setProducts] = useState<Product[]>();

    useEffect(() => {
    
        auth.signIn()
            .pipe(
                switchMap((user) => productProvider.getAllProductsForUser(user.user))
            ).subscribe((p) => {
                setProducts(p);
            });

    }, []);

    return (
        <View>
            <Text>{auth.user?.email ?? 'Nicht angemeldet'}</Text>
            {auth.user?
            <Inventory></Inventory>
            :
            <Text>Signing in...</Text>
            }
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