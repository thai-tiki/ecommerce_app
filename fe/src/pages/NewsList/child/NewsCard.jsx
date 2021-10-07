import { handleImgErr } from "../../../helper";
export default function NewsCard(props) {
  const { image, title, preview, date, id } = props;
  return (
    <a href={`/tin-tuc/${id}`} className="news-card row">
      <div className="image">
        <div className="img-container">
          <img src={image} alt="" onError={handleImgErr} />
        </div>
      </div>
      <div style={{ width: "100%", overflow: "hidden" }}>
        <div className="title">
          {title}
        </div>
        <div className="date">
          <img src="/img/calendar.png" alt="" />
          {date}
        </div>
        <div className="preview" id="preview" dangerouslySetInnerHTML={{ __html: preview }}>
        </div>
      </div>
    </a>
  )
}