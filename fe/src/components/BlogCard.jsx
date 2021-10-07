import { Link } from "react-router-dom";
import { useRef } from "react";
import { handleImgErr } from "../helper";
export default function BlogCard(props) {
  const myLink = useRef(null);
  function handleClick() {
    myLink.current.click();
  }
  return (
    <div className="blog-card" onClick={handleClick}>
      <div style={{ display: "none" }}>
        <Link ref={myLink} to={`/tin-tuc/${props.title.replace(/\s/g, '-')}-${props.id}`} />
      </div>
      <div className="image">
        <div className="img-container">
          <img src={props.img} alt="" onError={handleImgErr} />
        </div>
      </div>
      <div>
        <div className="blog-title">
          {props.title}
        </div>
        <div className="blog-quote" dangerouslySetInnerHTML={{ __html: props.quote }}>
        </div>
      </div>
    </div>
  )
}