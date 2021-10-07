import BlogCard from "../../../components/BlogCard";
import Slider from "react-slick";
export default function BlogSection(props) {
  var settings = {
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
    ]
  };
  return (
    <div className="blog-section">
      <h3>
        Bài viết mới
      </h3>
      <Slider {...settings}>
        {
          props.posts.map((v, i) =>
            <div className="card-container" key={i}>
              <BlogCard
                key={i}
                id={v.id}
                title={v.title}
                img={v.image_url}
                quote={v.content}
              />
            </div>
          )
        }
      </Slider>
    </div>
  )
}