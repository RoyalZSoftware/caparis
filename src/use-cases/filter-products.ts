import { useEffect, useState } from "react";
import { Product } from "../core/product";
import { useDependencies } from "../infrastructure/deps";

export function useFilterProducts() {
    const [loading, setLoading] = useState(null);

    const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
    const [currentFilter, setCurrentFilter] = useState<string>('');
    const {productRepository, userRepository} = useDependencies();
    const [refreshCounter, setRefreshCounter] = useState(0);

    const refresh = () => {
        setRefreshCounter(refreshCounter+1);
    }

    useEffect(() => {
        setLoading(true);
        productRepository.getProductsForUser(userRepository.currentUser.uid).subscribe((retrieved) => {
            setFetchedProducts(retrieved);
            setLoading(false);
        });
    }, [currentFilter, refreshCounter])

    return {fetchedProducts, currentFilter, setCurrentFilter, loading, refresh};
}