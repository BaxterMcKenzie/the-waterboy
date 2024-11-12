import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import Seo from "../components/Seo";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

// Component to display the location name and header
const LocationName = ({ location }) => {
  return (
    <>
      <h2>All Events</h2>
      <h3>Location: {location.name || "Unknown"}</h3>
    </>
  );
};

// Component to display all events for the given location
const AllEventsInLocation = ({ params }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const endpoint = `${baseUrl}/events?location=${params.id}&_embed`;

  useEffect(() => {
    axios
      .get(endpoint)
      .then((res) => {
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

// Component to display all "Get Involved" posts for the given location
const AllGetInvolvedInLocation = ({ params }) => {
  const [getInvolvedPosts, setGetInvolvedPosts] = useState([]);
  const [loading, setLoading] = useState(true);


  const endpoint = `${baseUrl}/get_involved?location=${params.id}&_embed`;

  useEffect(() => {
    axios
      .get(endpoint)
      .then((res) => {
        setGetInvolvedPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) return <div>Loading Get Involved posts...</div>;

  return (
    <>
      <h2>Get Involved</h2>
      <div className="get-involved-grid">
        {getInvolvedPosts.length > 0 ? (
          getInvolvedPosts.map((post, index) => {
            const featuredImage =
              post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
              "https://via.placeholder.com/150";

            return (
              <div className="get-involved-item" key={index}>
                <Link className="get-involved-link" to={`/get-involved/${post.id}`}>
                  <img
                    src={featuredImage}
                    alt={post.title.rendered}
                    className="get-involved-image"
                  />
                  <h4 className="name">{post.title.rendered}</h4>
                </Link>
              </div>
            );
          })
        ) : (
          <p>No Get Involved posts found for this location.</p>
        )}
      </div>
    </>
  );
};

// Main Location component
const Location = () => {
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();

  // Ensure the correct endpoint for fetching location data
  const locationEndpoint = `${baseUrl}/wp-json/wp/v2/locations/${params.id}`;

  useEffect(() => {
    axios
      .get(locationEndpoint)
      .then((res) => {
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
        
        {/* Events Section */}
        <div className="event-grid">
          <AllEventsInLocation params={params} />
        </div>

        {/* Get Involved Section */}
        <div className="get-involved-section">
          <AllGetInvolvedInLocation params={params} />
        </div>
      </div>
    </>
  );
};

export default Location;
