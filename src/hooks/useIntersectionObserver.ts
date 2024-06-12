import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = (callback: () => void, options?: IntersectionObserverInit) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    console.log(isIntersecting, "intersection");
    
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsIntersecting(true);
                    callback();
                } else {
                    setIsIntersecting(false);
                }
            },
            options
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current );
            }
        };
    }, [callback, options]);

    return ref;
};

export default useIntersectionObserver;
