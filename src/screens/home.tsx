import { Text } from "react-native";
import BaseLayout from "../components/base-layout";
import List from "../components/list";
import { ExpireNextProductListItem } from "../components/product-list-item";
import { theme } from "../components/theme";
import { ExpireNextWidget } from "../components/widgets/expire-next";
import { useFilterProducts } from "../use-cases/filter-products";

export default function HomeScreen() {
    const {fetchedProducts, loading} = useFilterProducts();

    return (
        <BaseLayout headerChild={<ExpireNextWidget expireNext={fetchedProducts}></ExpireNextWidget>}>
            <Text style={{...theme.fonts.filter, padding: theme.spacing.s}}>Recipes with expiring food</Text>
            <List loading={loading} items={fetchedProducts.map(c => new ExpireNextProductListItem({item: c}))}></List>
        </BaseLayout>
    );

}