import React from "react";
import heroImage from "../photo/h1_hero.png";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "./Header";
const Slider = () => {
  const sliderStyle = {
    backgroundImage: `url(${heroImage})`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    height: "100vh", // Set the height to 100% of the viewport height
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div>
        <Header/>
    <div id="home" className="slider-area position-relative">
      <div className="slider-active">
        {/* Single Slider 1 */}
        <div className="single-slider" style={sliderStyle}>
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="hero__caption">
                  <span
                    className="hero__subtitle"
                    style={{
                      color: "#396CF0",
                      fontSize: "18px",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      paddingBottom: "35px",
                    }}
                  >
                    Committed to Success
                  </span>
                  <div style={{ marginTop: "35px" }}>
                    <h1
                      className="cd-headline letters scale"
                      style={{ fontSize: "70px", fontWeight: "800" }}
                    >
                      We Care About Your
                      <strong className="cd-words-wrapper">
                        <b className="is-visible"> Health</b>
                        {/* <b>Sushi</b>
                        <b>Steak</b> */}
                      </strong>
                    </h1>
                  </div>
                  <p
                    style={{
                      padding: "20px 0",
                      fontSize: "18px",
                      color: "#808080",
                      lineHeight: "1.6",
                    }}
                    data-animation="fadeInLeft"
                    data-delay="0.1s"
                  >
                    We are dedicated to
                    your well-being. Our commitment to success is reflected in
                    the quality of healthcare services we provide. We believe in
                    delivering personalized care to enhance your health and
                    overall experience. Our team of experienced professionals is
                    here to support you on your journey to well-being.
                  </p>

                  <Button
                    variant="secondary"
                    className="mr-2  "
                    style={{
                      marginBottom: "30px",
                      width: " 30%",
                      padding: "10px",
                      color: "black",
                    }}
                  >
                  <Link to="/login" className="text-primary">
                    Đặt lịch khám ngay
                  </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default Slider;