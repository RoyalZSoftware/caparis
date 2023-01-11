import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import List from "../components/list";
import { ProductListItem } from "../components/product-list-item";
import useFirebaseAuth from "../data-provider/firebase-auth";
import { useProductProvider } from "../data-provider/models/product";

export default function Inventory() {

    const [loading, setLoading] = useState(true);

    const auth = useFirebaseAuth();

    const productProvider = useProductProvider();

    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        productProvider.getAllProductsForUser(auth.user)
            .subscribe((products) => {
                setAllProducts(products);
                setLoading(false);
            });
    }, []);

    if (loading) return (<Text>Loading..</Text>);

    return (
        <View>
            <List items={allProducts.map(product => new ProductListItem(product))}></List>
        </View>
    );

}