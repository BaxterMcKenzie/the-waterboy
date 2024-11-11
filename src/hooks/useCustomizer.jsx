import { useState, useEffect } from "react";
import axios from "axios";

const useCustomizer = () => {
  const [bgColor, setBgColor] = useState("");
  const [fontFamily, setFontFamily] = useState("");
  const [mobileMenu, setMobileMenu] = useState("");
  const [navColor, setNavColor] = useState("");
  const [buttonColor, setButtonColor] = useState("");

  // Use the updated base URL for customizer settings
  const baseUrl = import.meta.env.VITE_WP_BASE_URL; // Change this line

  useEffect(() => {
    axios.get(`${baseUrl}custom-theme/v1/customizer-settings`) // Adjust the endpoint here
      .then((response) => {
        const { backgroundColor, fontFamily, mobileMenu, navbarColor } = response.data;
        setBgColor(backgroundColor);
        setFontFamily(fontFamily);
        setMobileMenu(mobileMenu);
        setNavColor(navbarColor);
        setButtonColor(buttonColor);
      })
      .catch((error) => {
        console.error('Error fetching customizer settings: ', error);
      });
  }, [baseUrl]);

  return { bgColor, fontFamily, mobileMenu, navColor, buttonColor };
};

export default useCustomizer;
