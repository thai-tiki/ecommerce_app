import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { uploadImage } from "../../../helper";
import { userActions } from "../../../actions/userActions";
export default function ProfilePopup(props) {
  const myFile = useRef(null);
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const [updateInfo, setUpdateInfo] = useState(profile);
  const DoB = profile.date_of_birth ? profile.date_of_birth.split(" ")[0] : "";
  const [startDate, setStartDate] = useState(new Date(profile.date_of_birth));
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  useEffect(() => {
    if (!selectedFile)
      return;
    let url = URL.createObjectURL(selectedFile);
    setPreviewImage(url);
  }, [selectedFile])
  function handleInputChange(e) {
    let info = { ...updateInfo };
    info[e.target.name] = e.target.value;
    if (e.target.name === "sex")
      info.sex = parseInt(e.target.value);
    setUpdateInfo(info);
  }
  function handleSelectImage() {
    myFile.current.click();
  }
  function handleFileSelect(e) {
    if (!e.target.files)
      return;
    setSelectedFile(e.target.files[0])
  }
  async function handleSubmit() {
    let profile = { ...updateInfo };
    if (selectedFile) {
      let formData = new FormData();
      formData.append("image", selectedFile);
      let url = await uploadImage(formData);
      profile.avatar_image = url;
    }
    profile.date_of_birth = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`
    dispatch(userActions.updateUserProfile(profile));
  }
  return (
    <div className="modal center">
      <div className="profile-popup">
        <button className="close-popup-btn" onClick={props.handleClose}>
          <i className="far fa-times-circle"></i>
        </button>
        <h4>Cập nhật thông tin</h4>
        <input
          autoComplete="off"
          type="text"
          name="name"
          placeholder="Họ và tên"
          value={updateInfo.name}
          onChange={handleInputChange}
        />
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <div className="row">
          <label>Giới tính: </label>
          <div>
            <div className="row">
              <label htmlFor="male">
                Nam
              </label>
              <input
                checked={updateInfo.sex === 1}
                name="sex"
                value="1"
                type="checkbox"
                id="male"
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="female">
                Nữ
              </label>
              <input
                checked={updateInfo.sex === 2}
                name="sex"
                value="2"
                type="checkbox"
                id="female"
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="other">
                Khác
              </label>
              <input
                checked={updateInfo.sex === 0}
                name="sex"
                value="0"
                type="checkbox"
                id="other"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="blur">Chọn ảnh đại diện</div>
          <div className="image" onClick={handleSelectImage}>
            <div className="img-container">
              <img alt=""
                src={previewImage ? previewImage : "/img/default_product.jpg"}
                style={{ background: "url(/img/default_product.jpg)", backgroundSize: "contain" }} />
            </div>
          </div>
        </div>
        <div style={{ display: "none" }}>
          <input ref={myFile} type="file" onChange={handleFileSelect} />
        </div>
        <button onClick={handleSubmit} className="submit-btn">Cập nhật</button>
      </div>
    </div>
  )
}