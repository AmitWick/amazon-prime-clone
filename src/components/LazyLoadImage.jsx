/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

function LazyLoadImage({ src, alt, fallbackSrc, ...props }) {
  const imgRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px", // No margin
      threshold: 0.1, // Trigger when at least 10% of the image is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Load the image source and stop observing
          imgRef.current.src = src;
          observer.unobserve(imgRef.current);
        }
      });
    }, options);

    // Start observing the image element
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      // Clean up the observer when the component unmounts
      observer.disconnect();
    };
  }, [src]);

  return <img ref={imgRef} src={fallbackSrc} alt={alt} {...props} />;
}

export default LazyLoadImage;
