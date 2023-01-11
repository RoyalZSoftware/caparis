import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Button from "../components/button";
import useFirebaseAuth from "../data-provider/firebase-auth";
import { getRepository } from 'fireorm';

import { from } from "rxjs";
import { Product } from "../data-provider/models/product";
Product
import List from "../components/list";
import { ProductListItem } from "../components/product-list-item";

export default function LoginScreen() {
    
    const auth = useFirebaseAuth();

    const [products, setProducts] = useState<Product[]>();

    useEffect(() => {
        const repository = getRepository(Product);
        from(repository.find()).subscribe((products: Product[]) => {
            setProducts(products);
        })
    }, []);

    return (
    <View>
        <Text>{auth.user?.email ?? 'Nicht angemeldet' }</Text>
        <View>
            <List items={products?.map(c => new ProductListItem(c))}></List>
        </View>
        <Button title={'Hallo'} onPress={() => {
            const pr = new Product();
            pr.name = "Test";
            pr.barcodeIdentifier = '123';
            pr.expiryDate = new Date().toString();

            getRepository(Product).create(pr).then(() => {
                console.log("Created!");
            }).catch((error) => {
                console.log(error);
            });

        }}></Button>
    </View>);

}