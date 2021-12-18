import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../../helper";
import { constants as c } from "../../../constants";
import { appActions } from "../../../actions/appActions";
import { categoryActions } from "../../../actions/categoryActions";
export default function CategoryAddForm() {
  const myInput = useRef(null);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  function handleFileSelect(e) {
    if (!e.target.files)
      return;
    setSelectedFile(e.target.files[0]);
  }
  async function handleSubmit() {
    let msg = "";
    dispatch(appActions.changePopup(c.MESSAGE_POPUP, "", { status: c.LOADING }));
    if (!selectedFile)
      msg = "Vui lòng chọn ảnh cho danh mục!";
    if (!name)
      msg = "Vui lòng điền đầy đủ thông tin!";
    let formData = new FormData();
    formData.append("image", selectedFile);
    let url = await uploadImage(formData);
    if (!url)
      msg = "Có lỗi xảy ra vui lòng thử lại sau!";
    if (msg) {
      dispatch(appActions.changePopup(c.AUTOHIDE_POPUP, msg));
      return;
    }
    dispatch(categoryActions.addCategory({
      name,
      image: url
    }));
  }
  useEffect(() => {
    if (!selectedFile)
      return;
    let imageUrl = URL.createObjectURL(selectedFile);
    setPreviewImage(imageUrl);
    console.log(imageUrl);
    return () => URL.revokeObjectURL(imageUrl);
  }, [selectedFile]);
  return (
    <div className="category-form">
      <h3>Thêm danh mục</h3>
      <div className="form-container">
        <div className="row">
          <label htmlFor="name">Tên danh mục</label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="row" style={{ alignItems: "flex-start" }}>
          <label style={{ lineHeight: "38px" }}>Hình ảnh</label>
          <div className="images">
            <div
              className="image"
              style={{ cursor: "pointer" }}
              onClick={() => { myInput.current.click() }}
            >
              <input
                type="file"
                ref={myInput}
                multiple={true}
                style={{ display: "none" }}
                onChange={handleFileSelect}
                accept="image/jpeg, image/jpg, image/png"
              />
              <div className="img-container">
                {
                  previewImage
                    ?
                    <>
                      <img src={previewImage} alt="" />
                      <div>Thay đổi</div>
                    </>
                    :
                    <img src="/img/add_img.png" alt="" />
                }
              </div>
            </div>
          </div>
        </div>
        <button id="submit-btn" onClick={handleSubmit}>Thêm</button>
      </div>
    </div>
  )
}