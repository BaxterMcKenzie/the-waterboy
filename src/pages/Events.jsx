import { useState, useEffect } from "react";
import axios from "axios";
import PageHeader from "../components/PageHeader";

// SEO
import Seo from "../components/Seo";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Events = () => {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);

  const endpoint = `${baseUrl}/events?_embed`;

  useEffect(() => {
    axios
      .get(`${endpoint}`)
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const EventsList = ({ events }) => {
    const mappedEvents = events.map((event, index) => {
      // Featured image check
      function getFeaturedImage(event) {
        if (
          event &&
          event._embedded &&
          event._embedded["wp:featuredmedia"] &&
          event._embedded["wp:featuredmedia"][0].source_url
        ) {
          return event._embedded["wp:featuredmedia"][0].source_url;
        } else {
          return "https://via.placeholder.com/150";
        }
      }

      return (
        <>
          <div key={event.slug + "-" + index} className="post-container-events">
            <div className="top-title">
              <h4 className="title">
                {event.title.rendered}
                <span className="header-underlay-title">
                  {event.title.rendered}
                </span>
              </h4>
            </div>

            <div className="image-info">
              <div className="image-left">
                <img src={getFeaturedImage(event)} alt={event.title.rendered} />
              </div>

              <div className="text-right">
                <div
                  dangerouslySetInnerHTML={{ __html: event.content.rendered }}
                />
                <div>Key: {event.slug + "-" + index}</div>
                <li key={event.slug + "-" + index}>
                  <a href={`#/event/${event.id}`}>Read More...</a>
                </li>
              </div>
            </div>
          </div>
        </>
      );
    });

    // return of events component
    return <>{mappedEvents}</>;
  };

  return (
    <>
      <Seo
      title="Events - The Waterboy"
      description="Browse these amanzing events"
      url={window.location.href}
      />

      <PageHeader title="Events" image_url="/header-bg-img/events.png" />

      <div className="event-container">
        <div id="eventsCont">
          {loading ? <p>Loading...</p> : <EventsList events={events} />}
        </div>
      </div>
    </>
  );
};

export default Events;
