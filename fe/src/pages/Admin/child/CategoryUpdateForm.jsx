import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../../helper";
import { constants as c } from "../../../constants";
import { appActions } from "../../../actions/appActions";
import { categoryActions } from "../../../actions/categoryActions";
export default function CategoryUpdateForm(props) {
  const myInput = useRef(null);
  const dispatch = useDispatch();
  const [info, setInfo] = useState({ ...props.category });
  const [selectedFile, setSelectedFile] = useState(null);
  function handleFileSelect(e) {
    if (!e.target.files)
      return;
    setSelectedFile(e.target.files[0]);
  }
  async function handleSubmit() {
    let formData = new FormData();
    formData.append("image", selectedFile);
    let url = await uploadImage(formData);
    dispatch(appActions.changePopup(c.MESSAGE_POPUP, "", { status: c.LOADING }));
    dispatch(categoryActions.addCategory({
      ...info,
      image: url
    }));
  }
  useEffect(() => {
    if (selectedFile) {
      let imageUrl = URL.createObjectURL(selectedFile);
      setInfo({ ...info, image: imageUrl });
      return () => URL.revokeObjectURL(imageUrl);
    }
    if (props.category._id !== info._id)
      setInfo({ ...props.category });
  }, [selectedFile, props]);
  return (
    <div className="category-form">
      <div className="form-header">
        <h3>Thông tin danh mục</h3>
        <button
          onClick={() => props.onFormChange("add")}>
          Thêm mới <i className="fas fa-plus"></i>
        </button>
      </div>
      <div className="form-container">
        <div className="row">
          <label htmlFor="name">Tên danh mục</label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="off"
            value={info.name}
            onChange={(e) => setInfo({ ...info, name: e.target.value })}
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
                  info.image
                    ?
                    <>
                      <img src={info.image} alt="" />
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