export default function CommentCard(props) {
  const msg = [
    "Vui lòng đánh giá",
    "Rất không hài lòng",
    "Không hài lòng",
    "Bình thường",
    "Hài lòng",
    "Rất hài lòng"
  ];
  const { images, customer, stars, content } = props;
  console.log(images, images.length);
  return (
    <div className="comment-card row">
      <div className="user-info" style={{ alignItems: "center", height: "fit-content" }}>
        <div className="avt">
          HD
        </div>
        <div>
          <div className="name">{customer}</div>
          <div> <span>Khách đã mua hàng</span></div>
        </div>
      </div>
      <div className="comment-display">
        <div className="row">
          <div>
            {
              [1, 2, 3, 4, 5].map((v, i) =>
                <i key={i} className={v <= stars ? "fas fa-star" : "far fa-star"}></i>)
            }
          </div>
          {msg[stars]}
        </div>
        {
          content &&
          <div className="content">
            {content}
          </div>
        }
        {
          images.length > 0 &&
          <div className="images">
            {
              images.map((v, i) => i <= 5 &&
                <div onClick={() => props.showImages(images, i)} key={i} style={{ position: "relative" }}>
                  <div className="img-container" key={i}>
                    <img src={v} alt="" />
                  </div>
                  {
                    i === 5 && images.length > 6 &&
                    <div className="show-number">
                      {`+${images.length - 5}`}
                    </div>
                  }
                </div>
              )
            }
          </div>
        }
      </div>
    </div>
  )
}