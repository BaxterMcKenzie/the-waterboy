import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomeHeader = () => {
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.start();
    }
  };

  const handleGetInvolvedClick = () => {
    navigate("/get-involved");
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  const handleEventsClick = () => {
    navigate("/events");
  };

  return (
    <div
      className="page-header"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 5000, // delay in ms
          disableOnInteraction: false, // autoplay continues after user interaction
        }}
        speed={1000} // transition speed
      >
        <SwiperSlide
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url('/header-bg-img/bg1.webp')`,
          }}
        >
          <div className="header-text">
            <h2 className="hero-h2">
              Stronger People. <br /> Stronger Communities.
              <span className="header-underlay">
                Stronger People. <br /> Stronger Communities.
              </span>
            </h2>
            <button className="hero-button" onClick={handleGetInvolvedClick}>Get Involved</button>
          </div>
        </SwiperSlide>

        <SwiperSlide
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url('/header-bg-img/bg2.jpeg')`,
          }}
        >
          <div className="header-text">
            <h2 className="hero-h2">
              Get in the Game. <br /> Join our Community.
              <span className="header-underlay">
              Get in the Game. <br /> Join our Community.
              </span>
            </h2>
            <button className="hero-button" onClick={handleEventsClick}>Events</button>
          </div>
        </SwiperSlide>

        <SwiperSlide
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url('/header-bg-img/bg3.jpg')`,
          }}
        >
          <div className="header-text">
            <h2 className="hero-h2">
              Give us a bell. <br /> Flick us an email.
              <span className="header-underlay">
              Give us a bell. <br /> Flick us an email.
              </span>
            </h2>
            <button className="hero-button" onClick={handleContactClick}>Contact</button>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeHeader;
