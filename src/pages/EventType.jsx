import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import Seo from "../components/Seo";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const EventTypeName = ({ eventType }) => {
  return (
    <>
      <h2>All Events</h2>
      <h3>Event Type: {eventType.name || "Unknown"}</h3>
    </>
  );
};

const AllEventsInEventType = ({ params }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const endpoint = `${baseUrl}/events?event_type=${params.id}&_embed`; // Update to match your API structure

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
      <p>No events found for this event type.</p>
    );

  return <>{renderedEvents}</>;
};

const EventType = () => {
  const [eventType, setEventType] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const eventTypeEndpoint = `${baseUrl}/event-type/${params.id}`; // Endpoint for the specific event type

  useEffect(() => {
    console.log("Fetching event type from:", eventTypeEndpoint); // Debugging log
    axios
      .get(eventTypeEndpoint)
      .then((res) => {
        console.log("Event Type Data:", res.data); // Inspect the response data
        setEventType(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [eventTypeEndpoint]);

  if (loading) return <div>Loading event type...</div>;

  return (
    <>
      <Seo
        title="Event Type - The Waterboy"
        description="Browse this amazing event type"
        url={window.location.href}
      />

      <div id="eventsViaType" className="page-container">
        <EventTypeName eventType={eventType} />
        <div className="event-grid">
          <AllEventsInEventType params={params} />
        </div>
      </div>
    </>
  );
};

export default EventType;
