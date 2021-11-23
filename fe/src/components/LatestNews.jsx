import { Link } from "react-router-dom";
export default function LatestNews(props) {
  return (
    <Link className="latest-news-card row"
      to={`/tin-tuc/${props.title.replace(/[\s?/]/g, '-')}-${props._id}`}>
      <div className="image">
        <div className="img-container">
          <img src={props.img} alt="" />
        </div>
      </div>
      <div className="info">
        <h5>{props.title}</h5>
        <div className="date">{props.date}</div>
        <div className="content" dangerouslySetInnerHTML={{ __html: props.content }}></div>
      </div>
    </Link>
  )
}