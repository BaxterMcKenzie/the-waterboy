import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import PageHeader from "./PageHeader";

import Seo from "./Seo";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Taxonomies = ({ sponsor }) => {
  const [sponsorTypes, setSponsorTypes] = useState([]);

  useEffect(() => {
    if (!sponsor) return;

    // Fetch sponsor types
    const sponsorTypeEndpoint = sponsor._links["wp:term"]?.find(
      (link) => link.taxonomy === "sponsor-type"
    )?.href;
    console.log("Sponsor Type Endpoint:", sponsorTypeEndpoint); // Debugging log
    if (sponsorTypeEndpoint) {
      axios
        .get(sponsorTypeEndpoint)
        .then((response) => {
          console.log("Sponsor Types Response:", response.data); // Log the response data
          setSponsorTypes(response.data);
        })
        .catch((error) => console.log("Sponsor Type Error:", error));
    } else {
      console.log("No sponsor type endpoint found."); // Debugging log
    }
  }, [sponsor]);

  const renderTaxonomies = (taxonomies) =>
    taxonomies.map((taxonomy, index) => (
      <Link to={`/${taxonomy.taxonomy}/${taxonomy.id}`} key={index}>
        <span className="taxonomy-term-pill">{taxonomy.name}</span>
      </Link>
    ));

  return (
    <div>
      <h4>Sponsor Type:</h4>
      <div>{renderTaxonomies(sponsorTypes)}</div>
    </div>
  );
};

const Sponsor = () => {
  const [sponsor, setSponsor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const endpoint = `${baseUrl}/sponsors/${id}?_embed`;

  useEffect(() => {
    axios
      .get(endpoint)
      .then((res) => {
        console.log("Fetched Sponsor Data:", res.data); // Log fetched sponsor data
        setSponsor(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [endpoint]);

  function getFeaturedImage(sponsor) {
    return (
      sponsor?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      "https://via.placeholder.com/150"
    );
  }

  if (loading) {
    return <>Loading...</>;
  }

  if (!sponsor) {
    return <>Sponsor not found.</>;
  }

  return (
    <>
      <Seo
        title={sponsor.yoast_head_json?.title || sponsor.title.rendered}
        description={sponsor.yoast_head_json?.description}
        image={sponsor.yoast_head_json?.og_image?.[0]?.url}
        url={window.location.href}
      />

      <PageHeader
        title={sponsor.title.rendered}
        image_url={getFeaturedImage(sponsor)}
      />
      <div key={sponsor.slug} className="single-post-container">
        <div dangerouslySetInnerHTML={{ __html: sponsor.content.rendered }} />

        {/* Render Taxonomies */}
        <Taxonomies sponsor={sponsor} />

        {/* Back to Sponsors List Link */}
        <Link to="/sponsors" className="back-to-sponsors">
          Back to Sponsors
        </Link>
      </div>
    </>
  );
};

export default Sponsor;
