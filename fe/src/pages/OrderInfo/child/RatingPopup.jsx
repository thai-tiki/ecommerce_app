import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { uploadImage, getDate } from "../../../helper";
import { constants as c } from "../../../constants";
import { appActions } from "../../../actions/appActions";
import { productActions } from "../../../actions/productActions";
export default function RatingPopup(props) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentRatting, setCurrentRatting] = useState(0);
  const myInput = useRef(null);
  const msg = [
    "Vui lòng đánh giá",
    "Rất không hài lòng",
    "Không hài lòng",
    "Bình thường",
    "Hài lòng",
    "Rất hài lòng"
  ]
  useEffect(() => {
    if (!selectedFiles.length)
      return;
    let imageUrl = [];
    imageUrl = selectedFiles.map((v) => URL.createObjectURL(v));
    setPreviewImages(imageUrl);
    console.log(imageUrl);
    return () => URL.revokeObjectURL(imageUrl);
  }, [selectedFiles]);
  function handleFileSelect(e) {
    if (!e.target.files)
      return;
    const fileList = Array.prototype.slice.call(e.target.files);
    setSelectedFiles(fileList);
  }
  async function handleSubmit() {
    if (currentRatting < 1) {
      dispatch(appActions.changePopup(c.AUTOHIDE_POPUP, "Vui lòng chọn mức độ hài lòng"));
      return;
    }
    dispatch(appActions.changePopup(c.MESSAGE_POPUP, "", { status: c.LOADING }))
    let images = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      let formData = new FormData();
      formData.append("image", selectedFiles[i]);
      let url = await uploadImage(formData);
      images.push(url);
    };
    const reviewInfo = {
      stars: currentRatting,
      order: props.order._id,
      product: props.product._id,
      user: props.order.user,
      date: getDate(),
      content,
      images,
    };
    dispatch(productActions.reviewProduct(reviewInfo));
  }
  function handleChangeConent(e) {
    setContent(e.target.value);
  }
  function handleUpload() {
    myInput.current.click();
  }
  return (
    <div className="modal center">
      <div className="ratting-popup">
        <span>{props.product.name}</span>
        <h4>{msg[currentRatting]}</h4>
        <div className="stars">
          {
            [1, 2, 3, 4, 5].map((v, i) =>
              <i key={i}
                className={v <= currentRatting ? "fas fa-star" : "far fa-star"}
                onClick={() => setCurrentRatting(v)}></i>
            )
          }
        </div>
        <textarea rows="8" placeholder="Đánh giá của bạn" value={content} onChange={handleChangeConent}></textarea>
        <input
          multiple={true}
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          ref={myInput}
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
        <div className="preview-images">
          {
            previewImages.map((v, i) => i <= 7 &&
              <div key={i} style={{ position: "relative" }}>
                <div className="img-container" key={i}>
                  <img src={v} alt="" />
                </div>
                {
                  i === 7 && previewImages.length > 8 &&
                  <div className="show-number">
                    {`+${previewImages.length - 7}`}
                  </div>
                }
              </div>
            )
          }
        </div>
        <div className="row">
          <button className="image-btn" onClick={handleUpload}>
            Thêm ảnh
          </button>
          <button className="submit-btn" onClick={handleSubmit}>
            Gửi đánh giá
          </button>
        </div>
        <button className="close-btn" onClick={props.onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  )
}