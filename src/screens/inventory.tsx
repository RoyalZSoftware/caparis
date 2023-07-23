import BaseLayout from "../components/base-layout";
import Button from "../components/button";
import List from "../components/list";
import { ExpireNextProductListItem } from "../components/product-list-item";
import { useCreateProduct } from "../use-cases/create-product";
import { useFilterProducts } from "../use-cases/filter-products";

export default function Inventory() {
    const createProduct = useCreateProduct();

    const {fetchedProducts, loading, refresh} = useFilterProducts();

    const createProductAndRefresh = () => {
        createProduct('Nix', 1).subscribe(() => {
            refresh();
        });
    }

    return (
        <BaseLayout>
            <Button onPress={() => createProductAndRefresh()} title={"New"}></Button>
            <List loading={loading} items={fetchedProducts.map(c => new ExpireNextProductListItem({item: c}))}></List>
        </BaseLayout>
    );

}