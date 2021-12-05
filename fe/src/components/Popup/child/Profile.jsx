import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { constants as c } from "../../../constants";
import { userActions } from "../../../actions/userActions";
import { appActions } from "../../../actions/appActions";
export default function Profile(props) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const { msg, additionalInfo } = useSelector(state => state.app.popup);
  const [info, setInfo] = useState({ ...profile });
  function handleInputChange(e) {
    let { name, value } = e.target;
    if (name === "sex")
      value = parseInt(value);
    setInfo({ ...info, [name]: value })
  }
  function handleSubmit() {
    console.log(info);
    dispatch(appActions.changePopup(c.PROFILE_POPUP, "", { status: c.LOADING }));
    dispatch(userActions.updateUserProfile(info));
  }
  return (
    <div className="modal center">
      <div className="profile-popup">
        <button
          className="close-popup-btn"
          onClick={props.handleClose}
        >
          <i className="far fa-times-circle"></i>
        </button>
        <div className="row">
          <label htmlFor="name">Họ & Tên</label>
          <input
            type="text"
            name="name"
            value={info.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="row">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={info.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="row">
          <label htmlFor="phone">Số điện thoại</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={info.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="row">
          <label htmlFor="sex">Giới tính</label>
          <div className="row">
            <div>
              <input
                checked={info.sex === 1}
                type="radio"
                name="sex"
                id="male"
                value={1}
                onChange={handleInputChange}
              />
              <label htmlFor="male">Nam</label>
            </div>
            <div>
              <input
                checked={info.sex === 2}
                type="radio"
                name="sex"
                id="female"
                value={2}
                onChange={handleInputChange}
              />
              <label htmlFor="female">Nữ</label>
            </div>
            <div>
              <input
                checked={info.sex === 0}
                type="radio"
                name="sex"
                id="other"
                value={0}
                onChange={handleInputChange}
              />
              <label htmlFor="other">Khác</label>
            </div>
          </div>
        </div>
        {
          msg && additionalInfo && additionalInfo.status !== c.LOADING && < p > {msg}</p>
        }
        {
          additionalInfo && additionalInfo.status === c.LOADING &&
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{
              margin: "auto",
              display: "block",
              shapeRendering: "auto"
            }}
            width="100px"
            height="100px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid">
            <g transform="rotate(0 50 50)">
              <rect x="47" y="26" rx="3" ry="6" width="6" height="12" fill={"#333"}>
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.5s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
              </rect>
            </g><g transform="rotate(60 50 50)">
              <rect x="47" y="26" rx="3" ry="6" width="6" height="12" fill={"#333"}>
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.5s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
              </rect>
            </g><g transform="rotate(120 50 50)">
              <rect x="47" y="26" rx="3" ry="6" width="6" height="12" fill={"#333"}>
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.5s" begin="-0.5s" repeatCount="indefinite"></animate>
              </rect>
            </g><g transform="rotate(180 50 50)">
              <rect x="47" y="26" rx="3" ry="6" width="6" height="12" fill={"#333"}>
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.5s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
              </rect>
            </g><g transform="rotate(240 50 50)">
              <rect x="47" y="26" rx="3" ry="6" width="6" height="12" fill={"#333"}>
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.5s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
              </rect>
            </g><g transform="rotate(300 50 50)">
              <rect x="47" y="26" rx="3" ry="6" width="6" height="12" fill={"#333"}>
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.5s" begin="0s" repeatCount="indefinite"></animate>
              </rect>
            </g>
          </svg>
        }
        <button onClick={handleSubmit} className="submit-btn">Cập nhật</button>
      </div>
    </div >
  )
}