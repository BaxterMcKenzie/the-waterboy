import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import useCustomizer from "../hooks/useCustomizer";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";


const baseUrl = import.meta.env.VITE_WP_BASE_URL;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mobileMenu } = useCustomizer();
  const [logoUrl, setLogoUrl] = useState();
    const { cart } = useContext(CartContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // toggle between true/false
    document.body.style.overflow = isOpen ? "auto" : "hidden"; // disable page scroll when menu is open
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const mobile = document.querySelector(".nav-links");
    if (isOpen && mobile) {
      mobile.style.backgroundColor = mobileMenu;
    } else {
      mobile.style.backgroundColor = "transparent";
    }
  }, [isOpen, mobileMenu]);

  useEffect(() => {
    const fetchNavLogo = async () => {
      try {
        const response = await axios.get(`${baseUrl}custom/v1/nav-logo`);
        if (response.status === 200) {
          const data = response.data;
          setLogoUrl(data[0]); // This should return your logo URL
        } else {
          console.error("Failed to fetch logo URL");
          setLogoUrl(`${baseUrl}custom/v1/nav-logo`); // Fallback
        }
      } catch (error) {
        console.error("Error fetching logo", error);
        setLogoUrl(`${baseUrl}custom/v1/nav-logo`); // Fallback
      }
    };

    fetchNavLogo();
  }, []);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header>
      <nav className={`navbar ${isOpen ? "menu-open" : ""}`}>
        <NavLink to="/" className="logo">
          <img className="nav-logo" src={logoUrl} alt="Website Logo" />
        </NavLink>
        {/* Hamburger icon below: */}
        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`bar bar1 ${isOpen ? "toggle" : ""}`}></div>
          <div className={`bar bar2 ${isOpen ? "toggle" : ""}`}></div>
          <div className={`bar bar3 ${isOpen ? "toggle" : ""}`}></div>
        </div>
        {/* Navlinks */}
        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          <li>
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <span className="text">Home</span>
              <span className="underlay">Home</span>
            </NavLink>
          </li>

          {/* <li>
            <NavLink
              to="/about"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <span className="text">About</span>
              <span className="underlay">About</span>
            </NavLink>
          </li> */}

          <li>
            <NavLink
              to="/events"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <span className="text">Events</span>
              <span className="underlay">Events</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sponsors"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <span className="text">Sponsor</span>
              <span className="underlay">Sponsor</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/shop"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <span className="text">Shop</span>
              <span className="underlay">Shop</span>
            </NavLink>
          </li>

          <li className="cart-number">
            <NavLink
              to="/cart"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <span className="text">Cart</span>
              <span className="underlay">Cart</span>
              {totalItems > 0 && <span className="cart-span">{totalItems}</span>}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <span className="text">Contact</span>
              <span className="underlay">Contact</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/donate"
              onClick={closeMenu}
              className={({ isActive }) =>
                `active-link button ${isActive ? "active" : ""}`
              }
            >
              <button className="primary-button">Donate</button>
            </NavLink>
          </li>
        </ul>
      </nav>
      {isOpen && <div className="overlay" onClick={closeMenu}></div>}
    </header>
  );
};

export default Navbar;
