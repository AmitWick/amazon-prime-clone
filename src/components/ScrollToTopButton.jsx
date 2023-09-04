import { useState, useEffect } from "react";

function ScrollToTopButton() {
  const [isActive, setIsActive] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`fixed z-50 bottom-8 right-8 p-4 bg-black text-white opacity-0 
      transition-all duration-500 ease-in-out ${
        isActive && "opacity-100 cursor-pointer"
      }`}
      onClick={scrollToTop}
    >
      Scroll to Top
    </button>
  );
}

export default ScrollToTopButton;
