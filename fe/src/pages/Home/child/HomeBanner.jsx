import Slider from "react-slick";
import { Link } from "react-router-dom";
import CategoryCard from "../../../components/CategoryCard";
import DiscountProduct from "./DiscountProduct";
import { handleImgErr } from "../../../helper";
import { useSelector } from "react-redux";
export default function HomeBanner(props) {
  const { banners, categories, discountProducts } = props;
  const appTheme = useSelector(state => state.app.appTheme);
  var bannerSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    dotsClass: "slick-dots slick-thumb",
  };
  var cateSettings = {
    infinite: categories.length > 5,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          centerMode: true,
          arrows: false,
          infinite: categories.length > 2,
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          infinite: categories.length > 4,
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992,
        settings: {
          infinite: categories.length > 4,
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
    ]
  };
  function handleCateClick(id) {
    window.location.href = `/danh-sach-san-pham?danh-muc-ids=${id}`
  }
  return (
    <div className="home-banner row">
      <div className="categories-column">
        <div className="main-title" style={{ position: "relative", background: "transparent" }}>
          <div style={{ backgroundColor: appTheme.color_main_1, opacity: "0.25", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}></div>
          <h3>Danh mục</h3>
        </div>
        <div className="column">
          {
            categories.map((v, i) =>
              <Link
                key={i}
                style={{ cursor: "pointer", display: "flex" }}
                to={`/danh-sach-san-pham?danh-muc=${v.name.replace(/\s/g, "-")}-${v.id}`}>
                <div className="image">
                  <div className="img-container">
                    <img
                      src={v.image_url}
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
                    <img src={v.image_url} alt="banner" onError={handleImgErr} />
                  </div>
                </div>
              )
            }
          </Slider>
        </div>
        <div className="categories-row">
          <Slider {...cateSettings}>
            {
              categories.map((v, i) =>
                <div className="card-container" key={i}>
                  <CategoryCard
                    image={v.image_url}
                    title={v.name}
                    id={v.id}
                    key={i}
                  />
                </div>
              )
            }
          </Slider>
        </div>
      </div>
      <div className="discount-products">
        <div className="main-title" style={{ position: "relative", background: "transparent" }}>
          <div style={{ backgroundColor: appTheme.color_main_1, opacity: "0.25", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}></div>
          <h3 style={{ zIndex: 4 }}>Ưu đãi hôm nay</h3>
        </div>
        <div className="row" style={{ background: appTheme.color_main_1 }}>
          {
            discountProducts.map((v, i) =>
              <DiscountProduct product={v} key={i} />
            )
          }
        </div>
      </div>
    </div>
  )
}