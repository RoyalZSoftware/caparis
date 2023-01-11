import { View } from "react-native";

export interface ListItem {
    render();
}

export interface ListProperties {
    items: ListItem[];
};

export default function List({items}: ListProperties) {
    return (
        <View>
            {items?.map(c => c.render())}
        </View>
    );
}