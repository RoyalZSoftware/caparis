import { useState } from "react";
import { finalize, Observable } from "rxjs";

export function useLoadingState(obs: Observable<any>) {
    
    const [loading, setLoading] = useState(true);
    
    return {
        loading,
        observable: obs.pipe(
            finalize(() => setLoading(false))
        ),
    }
}