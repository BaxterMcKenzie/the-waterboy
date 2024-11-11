import { useState, useEffect } from "react";
import axios from "axios";
import PageHeader from "../components/PageHeader";

import Seo from "../components/Seo";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Sponsors = () => {
  const [sponsors, setSponsors] = useState(null);
  const [loading, setLoading] = useState(true);

  const endpoint = `${baseUrl}/sponsors?_embed`;

  useEffect(() => {
    axios
      .get(endpoint)
      .then((response) => {
        setSponsors(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  // Utility function to get excerpt
  const getExcerpt = (content, wordLimit = 50) => {
    const words = content.replace(/<[^>]+>/g, '').split(/\s+/); // Remove HTML tags and split by whitespace
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...'; // Join first 50 words and add ellipsis
    }
    return content; // Return full content if less than word limit
  };

  const SponsorsList = ({ sponsors }) => {
    const mappedSponsors = sponsors.map((sponsor, index) => {
      // Featured image check
      function getFeaturedImage(sponsor) {
        if (
          sponsor &&
          sponsor._embedded &&
          sponsor._embedded["wp:featuredmedia"] &&
          sponsor._embedded["wp:featuredmedia"][0].source_url
        ) {
          return sponsor._embedded["wp:featuredmedia"][0].source_url;
        } else {
          return "https://via.placeholder.com/150";
        }
      }

      return (
        <div key={sponsor.slug + "-" + index} className="post-container-sponsors">
          <div className="top-title">
            <h4 className="title">{sponsor.title.rendered}
              <span className="header-underlay-title">{sponsor.title.rendered}</span>
            </h4>
          </div>
          <div className="image-info">
            <div className="image-left">
              <img src={getFeaturedImage(sponsor)} alt={sponsor.title.rendered} />
            </div>
            <div className="text-right">
              <div dangerouslySetInnerHTML={{ __html: getExcerpt(sponsor.content.rendered) }} />
              <div>Key: {sponsor.slug + "-" + index}</div>
              <li key={sponsor.slug + "-" + index}>
                <a href={`#/sponsor/${sponsor.id}`}>Read More...</a>
              </li>
            </div>
          </div>
        </div>
      );
    });

    return <>{mappedSponsors}</>;
  };

  return (
    <>
    <Seo
        title="Sponsors - The Waterboy"
        description="Browse this amazing Sponsor"
        url={window.location.href}
      />
      <PageHeader title="Sponsors" image_url="/header-bg-img/sponsors.jpg" />
      <div className="sponsor-container">
        <div id="sponsorsCont">
          {loading ? <p>Loading...</p> : <SponsorsList sponsors={sponsors} />}
        </div>
      </div>
    </>
  );
};

export default Sponsors;
