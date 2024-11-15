import { Routes, Route } from 'react-router-dom';
// Import Pages
import Home from '../pages/Home';
import Events from '../pages/Events';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Location from '../pages/Location'; // Ensure you import the Location component
import EventType from '../pages/EventType';
import Event from '../components/Event';
import Cart from "../pages/Cart";
import Donate from '../pages/Donate';
import ProductList from './ProductList';
import Sponsors from '../pages/Sponsors';
import Sponsor from './Sponsor';
import SponsorType from '../pages/SponsorType';
import GetInvolved from '../pages/GetInvolved';
import GetInvolvedPost from '../components/GetInvolvedPost'; // Import your GetInvolvedPost component

const Links = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/events" element={<Events />} />
            <Route path="/event/:id" element={<Event />} />
            <Route path="/location/:id" element={<Location />} />
            <Route path="/event-type/:id" element={<EventType />} />
            <Route path="/sponsor-type/:id" element={<SponsorType />} />
            <Route path="/sponsor/:id" element={<Sponsor />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/shop" element={<ProductList />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/get-involved/:id" element={<GetInvolvedPost />} /> {/* Add single Get Involved post route */}
        </Routes>
    );
}

export default Links;
