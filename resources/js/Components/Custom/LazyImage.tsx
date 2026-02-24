import React, { useEffect, useState, useRef } from "react";

interface LazyImageProps {
    src: string;
    alt?: string;
    className?: string;
}

const LazyImage: React.FC<LazyImageProps> = React.memo(
    ({ src, alt = "Image", className }) => {
        const [isVisible, setIsVisible] = useState(false);
        const imageRef = useRef<HTMLImageElement | null>(null);

        useEffect(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setIsVisible(true);
                            observer.disconnect(); // Bir marta yuklangandan keyin kuzatuvni to'xtatish
                        }
                    });
                },
                { threshold: 0.1 } // Tasvir ko‘rinishi bilanoq yuklash
            );

            if (imageRef.current) {
                observer.observe(imageRef.current);
            }

            return () => {
                if (imageRef.current) {
                    observer.disconnect();
                }
            };
        }, []);

        return (
            <img
                ref={imageRef}
                src={
                    isVisible
                        ? src
                        : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmMGYwZjAiIC8+PC9zdmc+"
                } // Yengil placeholder
                alt={alt}
                className={`${className} transition-transform duration-500 ease-in-out`}
                loading="lazy"
            />
        );
    }
);

export default LazyImage;
