import { useState } from "react";
import { useSelector } from "react-redux";
import CommentCard from "./CommentCard";
import Slider from "react-slick";
export default function CommentTab(props) {
  const [currentImg, setCurrentImg] = useState(0);
  const [customClass, setCustomClass] = useState("");
  const [images, setImages] = useState([]);
  const reviews = useSelector(state => state.product.review);
  function showImagesSlider(images, currentImg) {
    setImages(images);
    setCurrentImg(currentImg);
    setCustomClass("active")
  }
  function closeImagesSlider() {
    setCustomClass("");
  }
  var settings = {
    infinite: images.length > 8,
    slidesToShow: 8,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          infinite: images.length > 4,
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          infinite: images.length > 6,
          slidesToShow: 6,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992,
        settings: {
          infinite: images.length > 6,
          slidesToShow: 6,
          slidesToScroll: 1,
        }
      },
    ]
  };
  return (
    reviews.list.length > 0 ?
      <div className="comment">
        <div className="total">
          <div className="row" style={{ marginBottom: "0.5em" }}>
            <div className="averaged-stars">
              {Math.round(reviews.info.averaged_stars * 10) / 10}
            </div>
            <div className="star-info-detail">
              <div className="row">
                {
                  [1, 2, 3, 4, 5].map((v, i) => <i key={i} className="fas fa-star"></i>)
                }
              </div>
              {reviews.list.length} Nhận xét
            </div>
          </div>
        </div>
        <div>
          {
            reviews.list.map((v, i) =>
              <CommentCard
                showImages={showImagesSlider}
                images={JSON.parse(v.images)}
                key={i}
                customer={v.customer.name}
                content={v.content}
                stars={v.stars}
              />
            )
          }
        </div>
        <div className={`images-show ${customClass}`}>
          <button onClick={closeImagesSlider}><i className="far fa-times-circle"></i></button>
          <div className="row container">
            <button className="left-btn"><i className="fas fa-chevron-left"></i></button>
            <img src={images[currentImg]} alt="" />
            <button className="right-btn"><i className="fas fa-chevron-right"></i></button>
          </div>
          <div className="container">
            <div className="images-slider">
              <Slider {...settings}>
                {
                  images.map((v, i) =>
                    <div className="wraper" key={i} onClick={() => setCurrentImg(i)}>
                      <div className="img-container">
                        <img className={i === currentImg ? "active" : ""} src={v} alt="" />
                      </div>
                    </div>
                  )
                }
              </Slider>
            </div>
          </div>
        </div>
      </div>
      :
      <div className="comment" style={{ textAlign: "center", fontSize: "18px", color: "#757575" }}>
        Chưa có nhận xét cho sản phẩm này
      </div>
  )
}