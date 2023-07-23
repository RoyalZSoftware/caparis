import { Component } from "react";
import { ScrollView, View } from "react-native";

export abstract class ListItem<T> extends Component<{item: T}> {
    abstract render();
}

export interface ListProperties<T> {
    items: ListItem<any>[];
};

export default function List<T>({items}: ListProperties<T>) {
    return (
        <ScrollView>
            {items.map(c => c.render())}
        </ScrollView>
    );
}