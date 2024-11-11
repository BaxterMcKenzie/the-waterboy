import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import Seo from "../components/Seo";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const LocationName = ({ location }) => {
  return (
    <>
      <h2>All Events</h2>
      <h3>Location: {location.name || "Unknown"}</h3>
    </>
  );
};

const AllEventsInLocation = ({ params }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const endpoint = `${baseUrl}/events?location=${params.id}&_embed`;

  useEffect(() => {
    console.log("Fetching events from:", endpoint); // Debugging log
    axios
      .get(endpoint)
      .then((res) => {
        console.log("Events Data:", res.data); // Inspect the response data
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) return <div>Loading events...</div>;

  const renderedEvents =
    events.length > 0 ? (
      events.map((event, index) => {
        // Get the featured image URL
        const featuredImage =
          event?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          "https://via.placeholder.com/150";

        return (
          <div className="event-container-tax item-container" key={index}>
            <Link className="event-link" to={`/event/${event.id}`}>
              <img
                src={featuredImage}
                alt={event.title.rendered}
                className="event-image"
              />
              <h4 className="name">{event.title.rendered}</h4>
            </Link>
          </div>
        );
      })
    ) : (
      <p>No events found for this location.</p>
    );

  return <>{renderedEvents}</>;
};

const Location = () => {
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const locationEndpoint = `${baseUrl}/location/${params.id}`;

  useEffect(() => {
    console.log("Fetching location from:", locationEndpoint); // Debugging log
    axios
      .get(locationEndpoint)
      .then((res) => {
        console.log("Location Data:", res.data); // Inspect the response data
        setLocation(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [locationEndpoint]);

  if (loading) return <div>Loading location...</div>;

  return (
    <>
      <Seo
        title="Location - The Waterboy"
        description="Browse this amazing location"
        url={window.location.href}
      />

      <div id="eventsViaLocation" className="page-container">
        <LocationName location={location} />
        <div className="event-grid">
          <AllEventsInLocation params={params} />
        </div>
      </div>
    </>
  );
};

export default Location;
