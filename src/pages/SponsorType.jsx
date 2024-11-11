import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import Seo from "../components/Seo";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const SponsorTypeName = ({ sponsorType }) => {
  return (
    <>
      <h2>All Sponsors</h2>
      <h3>Sponsor Type: {sponsorType.name || "Unknown"}</h3>
    </>
  );
};

const AllSponsorsInSponsorType = ({ params }) => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  const endpoint = `${baseUrl}/sponsors?sponsor_type=${params.id}&_embed`;

  useEffect(() => {
    console.log("Fetching sponsors from:", endpoint); // Debugging log
    axios
      .get(endpoint)
      .then((res) => {
        console.log("Sponsors Data:", res.data); // Inspect the response data
        setSponsors(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) return <div>Loading sponsors...</div>;

  const renderedSponsors =
    sponsors.length > 0 ? (
      sponsors.map((sponsor, index) => {
        const featuredImage =
          sponsor?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          "https://via.placeholder.com/150";

        return (
          <div className="event-container-tax item-container" key={index}>
            <Link className="event-link" to={`/sponsor/${sponsor.id}`}>
              <img
                src={featuredImage}
                alt={sponsor.title.rendered}
                className="event-image"
              />
              <h4 className="name">{sponsor.title.rendered}</h4>
            </Link>
          </div>
        );
      })
    ) : (
      <p>No sponsors found for this sponsor type.</p>
    );

  return <>{renderedSponsors}</>;
};

const SponsorType = () => {
  const [sponsorType, setSponsorType] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const sponsorTypeEndpoint = `${baseUrl}/sponsor-type/${params.id}`; // Endpoint for the specific sponsor type

  useEffect(() => {
    console.log("Fetching sponsor type from:", sponsorTypeEndpoint); // Debugging log
    axios
      .get(sponsorTypeEndpoint)
      .then((res) => {
        console.log("Sponsor Type Data:", res.data); // Inspect the response data
        setSponsorType(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [sponsorTypeEndpoint]);

  if (loading) return <div>Loading sponsor type...</div>;

  return (
    <>
      <Seo
        title="Sponsor Type - The Waterboy"
        description="Browse this amazing location"
        url={window.location.href}
      />
      <div id="sponsorsViaType" className="page-container">
        <SponsorTypeName sponsorType={sponsorType} />
        <div className="event-grid">
          <AllSponsorsInSponsorType params={params} />
        </div>
      </div>
    </>
  );
};

export default SponsorType;
