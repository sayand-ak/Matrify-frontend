import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = (callback: () => void) => {
    const options: IntersectionObserverInit = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0, 
    };
    const [isIntersecting, setIsIntersecting] = useState(false);
    console.log(isIntersecting, "intersection");
    
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsIntersecting(true);
                    callback()
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
    }, [callback]);

    return ref;
};

export default useIntersectionObserver;
