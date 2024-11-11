import { useState, useEffect } from "react";
import HomeHeader from "../components/HomeHeader";
import axios from "axios";

import Seo from "../components/Seo";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  const endpoint = `${baseUrl}/posts?_embed`;

  console.log({ endpoint }, { baseUrl });

  useEffect(() => {
    axios
      .get(endpoint)
      .then((res) => {
        console.log(res);
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const Posts = ({ posts }) => {
    return posts.map((post, index) => {
      // Access the image URL from the embedded data
      const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

      return (
        <div key={post.slug + "-" + index} className="post-container">
          <div className="left-about-image">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={post.title.rendered}
                className="post-image"
              />
            )}
          </div>

          <div className="right-about-content">
            <h2 className="title">{post.title.rendered}</h2>

            {/* Render full content instead of excerpt */}
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </div>

          {/* <li>
            <a href={`#/post/${post.id}`}>Read More...</a>
          </li> */}
        </div>
      );
    });
  };

  return (
    <>
      <Seo
        title="Home - The Waterboy"
        description="Browse this amazing Home"
        url={window.location.href}
      />

      <HomeHeader />
      <div id="homeCont">
        {loading ? <p>Loading...</p> : <Posts posts={posts} />}
      </div>
    </>
  );
};

export default Home;
