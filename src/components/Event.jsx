import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import PageHeader from "./PageHeader";

import Seo from "./Seo";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Taxonomies = ({ event }) => {
  const [eventTypes, setEventTypes] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (!event) return;

    // Fetch event types
    const eventTypeEndpoint = event._links["wp:term"].find(
      (link) => link.taxonomy === "event-type"
    )?.href;
    if (eventTypeEndpoint) {
      axios
        .get(eventTypeEndpoint)
        .then((response) => setEventTypes(response.data))
        .catch((error) => console.log("Event Type Error:", error));
    }

    // Fetch locations
    const locationEndpoint = event._links["wp:term"].find(
      (link) => link.taxonomy === "location"
    )?.href;
    if (locationEndpoint) {
      axios
        .get(locationEndpoint)
        .then((response) => setLocations(response.data))
        .catch((error) => console.log(error));
    }
  }, [event]);

  const renderTaxonomies = (taxonomies) =>
    taxonomies.map((taxonomy, index) => (
      <Link to={`/${taxonomy.taxonomy}/${taxonomy.id}`} key={index}>
        <span className="taxonomy-term-pill">{taxonomy.name}</span>
      </Link>
    ));

  return (
    <div>
      <h4>Event Type:</h4>
      <div>{renderTaxonomies(eventTypes)}</div>

      <h4>Location:</h4>
      <div>{renderTaxonomies(locations)}</div>
    </div>
  );
};

const Event = () => {
  const [event, setEvent] = useState(null);
  const [seoData, setSeoData] = useState(null); // Add state for SEO data
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const endpoint = `${baseUrl}/events/${id}?_embed`;

  useEffect(() => {
    axios
      .get(endpoint)
      .then((res) => {
        setEvent(res.data);
        setSeoData(res.data.yoast_head_json); // Set SEO data
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [endpoint]);

  function getFeaturedImage(event) {
    return (
      event?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      "https://via.placeholder.com/150"
    );
  }

  if (loading) {
    return <>Loading...</>;
  }

  // Access the 'events_dates' custom field
  const eventDates = event?.acf?.events_dates; // Replace with your actual custom field key

  // Assuming event has a property 'locationId' to reference back to the location
  const locationId = event?._embedded?.["wp:term"].find(
    (link) => link.taxonomy === "location"
  )?.id;

  return (
    <>
      <Seo
        title={event.yoast_head_json?.title || event.title.rendered}
        description={event.yoast_head_json?.description}
        image={event.yoast_head_json?.og_image?.[0]?.url}
        url={window.location.href}
      />

      <PageHeader
        title={event.title.rendered}
        image_url={getFeaturedImage(event)}
      />
      <div key={event.slug} className="single-post-container">
        <div dangerouslySetInnerHTML={{ __html: event.content.rendered }} />

        {/* Render custom field 'events_dates' */}
        {eventDates && (
          <div className="event-dates">
            <strong>Event Date/Time:</strong> {eventDates}
          </div>
        )}

        <Taxonomies event={event} />

        {/* Back to Location Link */}
        {locationId && (
          <Link to={`/location/${locationId}`} className="back-to-location">
            Back to Location
          </Link>
        )}
      </div>
    </>
  );
};

export default Event;
