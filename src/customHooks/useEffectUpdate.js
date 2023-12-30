import { useEffect, useRef } from "react";

export const useEffectUpdate = (cb, dependencies) => {
    const isFirstRender = useRef(true);
    
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        cb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
}
