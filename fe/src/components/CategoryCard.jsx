import { useRef } from "react";
import { Link } from "react-router-dom";
export default function CategoryCard(props) {
  const { image, title, id } = props;
  const myRef = useRef(null);
  function handleClick() {
    myRef.current.click();
  }
  return (
    <div className="category-card" onClick={handleClick}>
      <div style={{ display: "none" }}>
        <Link ref={myRef} to={`/danh-sach-san-pham?danh-muc=${title.replace(/\s/g, "-")}-${id}`}></Link>
      </div>
      <div className="image">
        <div className="img-container">
          <img src={image} alt={`cate${id}`} style={{ background: "url(../img/default_product.jpg)", backgroundSize: "contain" }} />
        </div>
      </div>
      <div className="title">
        {title}
      </div>
    </div>
  )
}