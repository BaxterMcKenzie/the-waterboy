import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import PageHeader from "./PageHeader";
import Seo from "./Seo";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Taxonomies = ({ involvement }) => {
  const [involvementTypes, setInvolvementTypes] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (!involvement) return;

    // Fetch involvement types
    const involvementTypeEndpoint = involvement._links["wp:term"].find(
      (link) => link.taxonomy === "involvement-type"
    )?.href;
    if (involvementTypeEndpoint) {
      axios
        .get(involvementTypeEndpoint)
        .then((response) => setInvolvementTypes(response.data))
        .catch((error) => console.log("Involvement Type Error:", error));
    }

    // Fetch locations
    const locationEndpoint = involvement._links["wp:term"].find(
      (link) => link.taxonomy === "location"
    )?.href;
    if (locationEndpoint) {
      axios
        .get(locationEndpoint)
        .then((response) => setLocations(response.data))
        .catch((error) => console.log(error));
    }
  }, [involvement]);

  const renderTaxonomies = (taxonomies) =>
    taxonomies.map((taxonomy, index) => (
      <Link to={`/${taxonomy.taxonomy}/${taxonomy.id}`} key={index}>
        <span className="taxonomy-term-pill">{taxonomy.name}</span>
      </Link>
    ));

  return (
    <div>
      <h4>Involvement Type:</h4>
      <div>{renderTaxonomies(involvementTypes)}</div>

      <h4>Location:</h4>
      <div>{renderTaxonomies(locations)}</div>
    </div>
  );
};

const GetInvolvedPost = () => {
  const [involvement, setInvolvement] = useState(null);
  const [seoData, setSeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const endpoint = `${baseUrl}/get-involved/${id}?_embed`;

  useEffect(() => {
    axios
      .get(endpoint)
      .then((res) => {
        setInvolvement(res.data);
        setSeoData(res.data.yoast_head_json); // Set SEO data if available
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [endpoint]);

  function getFeaturedImage(involvement) {
    return (
      involvement?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      "https://via.placeholder.com/150"
    );
  }

  if (loading) {
    return <>Loading...</>;
  }

  // Custom field example (if applicable)
  const involvementDetails = involvement?.acf?.involvement_details; // Replace with your actual custom field key

  // Assuming involvement has a property 'locationId' to reference back to the location
  const locationId = involvement?._embedded?.["wp:term"].find(
    (link) => link.taxonomy === "location"
  )?.id;

  return (
    <>
      <Seo
        title={seoData?.title || involvement.title.rendered}
        description={seoData?.description}
        image={seoData?.og_image?.[0]?.url}
        url={window.location.href}
      />

      <PageHeader
        title={involvement.title.rendered}
        image_url={getFeaturedImage(involvement)}
      />
      <div key={involvement.slug} className="single-post-container">
        <div dangerouslySetInnerHTML={{ __html: involvement.content.rendered }} />

        {/* Render custom field 'involvement_details' */}
        {involvementDetails && (
          <div className="involvement-details">
            <strong>Involvement Details:</strong> {involvementDetails}
          </div>
        )}

        <Taxonomies involvement={involvement} />

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

export default GetInvolvedPost;
