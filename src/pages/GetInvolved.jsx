import { useState, useEffect } from "react";
import axios from "axios";
import PageHeader from "../components/PageHeader";

// SEO
import Seo from "../components/Seo";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const GetInvolved = () => {
  const [involvementOptions, setInvolvementOptions] = useState(null);
  const [loading, setLoading] = useState(true);

  const endpoint = `${baseUrl}/get-involved?_embed`; // Update with your relevant API endpoint

  useEffect(() => {
    axios
      .get(`${endpoint}`)
      .then((response) => {
        setInvolvementOptions(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const InvolvementList = ({ involvementOptions }) => {
    const mappedInvolvementOptions = involvementOptions.map((option, index) => {
      // Featured image check
      function getFeaturedImage(option) {
        if (
          option &&
          option._embedded &&
          option._embedded["wp:featuredmedia"] &&
          option._embedded["wp:featuredmedia"][0].source_url
        ) {
          return option._embedded["wp:featuredmedia"][0].source_url;
        } else {
          return "https://via.placeholder.com/150"; // Default placeholder
        }
      }

      return (
        <div key={option.slug + "-" + index} className="post-container-events">
          <div className="top-title">
            <h4 className="title">
              {option.title.rendered}
              <span className="header-underlay-title">
                {option.title.rendered}
              </span>
            </h4>
          </div>

          <div className="image-info">
            <div className="image-left">
              <img src={getFeaturedImage(option)} alt={option.title.rendered} />
            </div>

            <div className="text-right">
              <div dangerouslySetInnerHTML={{ __html: option.content.rendered }} />
              <div key={option.slug + "-" + index}>
                <br />
                <button
                  onClick={() => (window.location.href = `#/get-involved/${option.id}`)}
                  className="primary-button"
                >
                  Get Involved
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });

    // return of involvement component
    return <>{mappedInvolvementOptions}</>;
  };

  return (
    <>
      <Seo
        title="Get Involved - The Waterboy"
        description="Explore ways to get involved and make a difference"
        url={window.location.href}
      />

      <PageHeader title="Get Involved" image_url="/header-bg-img/get-involved.webp" />

      <div className="event-container">
        <div id="eventsCont">
          {loading ? <p>Loading...</p> : <InvolvementList involvementOptions={involvementOptions} />}
        </div>
      </div>
    </>
  );
};

export default GetInvolved;
