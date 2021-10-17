import Slider from "react-slick";
import { Link } from "react-router-dom";
import { handleImgErr } from "../../../helper";
export default function HomeBanner(props) {
  const { banners, categories } = props;
  var bannerSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    autoplay: true,
    autoplaySpeed: 5000
  };
  return (
    <div className="home-banner row">
      <div className="categories-column">
        <div className="column">
          {
            categories.map((v, i) =>
              <Link
                key={i}
                style={{ cursor: "pointer", display: "flex" }}
                to={`/danh-sach-san-pham?danh-muc=${v.name.replace(/\s/g, "-")}-${v._id}`}>
                <div className="image">
                  <div className="img-container">
                    <img
                      src={v.image}
                      alt=""
                    />
                  </div>
                </div>
                <div>
                  {v.name}
                </div>
              </Link>
            )
          }
        </div>
      </div>
      <div className="middle">
        <div className="banners">
          <Slider {...bannerSettings}>
            {
              banners.map((v, i) =>
                <div key={i} className="image">
                  <div className="img-container">
                    <img src={v.image} alt="banner" onError={handleImgErr} />
                  </div>
                </div>
              )
            }
          </Slider>
        </div>
      </div>
    </div>
  )
}