import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadImage } from "../../../helper";
import { collaboratorActions as a } from "../../../actions/collaboratorActions";
export default function InfoPopup(props) {
  const dispatch = useDispatch();
  const [updateInfo, setUpdateInfo] = useState(props.info);
  const [lastTimeClick, setLastTimeClick] = useState(new Date());
  const appTheme = useSelector(state => state.app.appTheme);
  const frontFile = useRef(null);
  const backFile = useRef(null);
  function handleInputChange(e) {
    let info = { ...updateInfo };
    info[e.target.name] = e.target.value;
    setUpdateInfo(info);
  }
  function handleFileSelect(e, type) {
    if (!e.target.files)
      return;
    let info = { ...updateInfo };
    let url = URL.createObjectURL(e.target.files[0])
    if (type === "front")
      info.front_card = url;
    if (type === "back")
      info.back_card = url;
    setUpdateInfo(info);
    return () => URL.revokeObjectURL(url);
  }
  async function handleSubmit() {

 
    let endDate = new Date();
    if (endDate.getTime() - lastTimeClick.getTime() < 1000)
      return;
    setLastTimeClick(endDate);
    let info = { ...updateInfo };
    let formData;
    if (frontFile.current.files[0]) {
      formData = new FormData();
      formData.append("image", frontFile.current.files[0]);
      info.front_card = await uploadImage(formData)
      console.log("front");
    }
    if (backFile.current.files[0]) {
      formData = new FormData();
      formData.append("image", backFile.current.files[0]);
      info.back_card = await uploadImage(formData)
      console.log("back");
    }
    dispatch(a.updateInfo(info));
  }
  return (
    <div className={`modal ${props.customClass}`}>
      <div className="info-popup hide-scroll">
        <h4>Cập nhật thông tin</h4>
        <div className="row">
          <label htmlFor="name">Họ và tên: </label>
          <input
            autoComplete="off"
            type="text"
            id="name"
            name="first_and_last_name"
            onChange={handleInputChange}
            value={updateInfo.first_and_last_name}
            placeholder={props.info.first_and_last_name} />
        </div>
        <div className="row">
          <label htmlFor="account_name">Tên tài khoản</label>
          <input
            type="text"
            id="account_name"
            name="account_name"
            onChange={handleInputChange}
            value={updateInfo.account_name}
            placeholder={props.info.account_name} />
        </div>
        <div className="row">
          <label htmlFor="account_number">Số tài khoản</label>
          <input
            type="text"
            id="account_number"
            name="account_number"
            onChange={handleInputChange}
            value={updateInfo.account_number}
            placeholder={props.info.account_number} />
        </div>
        <div className="row">
          <label htmlFor="bank">Ngân hàng</label>
          <input
            type="text"
            id="bank"
            name="bank"
            onChange={handleInputChange}
            value={updateInfo.bank}
            placeholder={props.info.bank} />
        </div>
        <div className="row">
          <label htmlFor="branch">Chi nhánh</label>
          <input
            type="text"
            id="branch"
            name="branch"
            onChange={handleInputChange}
            value={updateInfo.branch}
            placeholder={props.info.branch} />
        </div>
        <div className="row">
          <label htmlFor="cmnd">CMND/CCCD:</label>
          <input
            type="text"
            id="cmnd"
            name="cmnd"
            onChange={handleInputChange}
            value={updateInfo.cmnd}
            placeholder={props.info.cmnd} />
        </div>
        <div className="row">
          <label></label>
          <div className="row">
            <div className="idcard-img">
              <label>Mặt trước: </label>
              <div style={{ display: "none" }}>
                <input
                  onChange={(e) => handleFileSelect(e, "front")}
                  ref={frontFile}
                  type="file"
                  accept="image/jpeg, image/jpg, image/png" />
              </div>
              <div className="image">
                <div className="blur" onClick={() => frontFile.current.click()}>
                  Thay đổi
                </div>
                <div className="img-container">
                  <img src={updateInfo.front_card} alt="" />
                </div>
              </div>
            </div>
            <div className="idcard-img">
              <label>Mặt sau: </label>
              <div style={{ display: "none" }}>
                <input
                  onChange={(e) => handleFileSelect(e, "back")}
                  ref={backFile}
                  type="file"
                  accept="image/jpeg, image/jpg, image/png" />
              </div>
              <div className="image">
                <div className="blur" onClick={() => backFile.current.click()}>
                  Thay đổi
                </div>
                <div className="img-container">
                  <img src={updateInfo.back_card} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <span>
          <button
            onClick={handleSubmit}
            className="submit-btn" style={{ background: appTheme.color_main_1 }}>
            Cập nhật
          </button>
          <button onClick={props.onClose}>Hủy</button>
        </span>
      </div>
    </div>
  )
}