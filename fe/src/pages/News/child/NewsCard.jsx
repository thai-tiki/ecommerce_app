import { useRef } from "react";
import { Link } from "react-router-dom";
import { handleImgErr } from "../../../helper";
export default function NewsCard(props) {
  const myLink = useRef(null);
  function handleClick() {
    myLink.current.click();
  }
  return (
    <div className="news-card" onClick={handleClick}>
      <div style={{ display: "none" }}>
        <Link ref={myLink} to={`/tin-tuc/${props.title.replace(/\s/g, '-')}-${props.id}`} />
      </div>
      <div className="image">
        <div className="img-container">
          <img src={props.image_url} onError={handleImgErr} alt="" />
        </div>
      </div>
      <div className="content">
        <div className="title">
          {props.title}
        </div>
        <div className="quote" dangerouslySetInnerHTML={{ __html: props.content }}>
        </div>
      </div>
    </div>
  )
}