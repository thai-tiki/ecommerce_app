import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appActions } from "../actions/appActions";
import { userActions } from "../actions/userActions";
import { constants as c } from "../constants";
import { validURL } from "../helper";
import HotlineContact from "./HotlineContact/HotlineContact";
export default function Footer() {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const tokenInfo = useSelector(state => state.user.tokenInfo);
  const cartInfo = useSelector(state => state.cart.cartInfo);
  const appTheme = useSelector(state => state.app.appTheme);
  const infoStore = useSelector((state) => state.app.infoStore);
  const cartNumber = cartInfo ? cartInfo.line_items.length : 0;
  function handlePhoneChange(e) {
    setPhone(e.target.value);
  }
  function handlePhoneCheck() {
    if (tokenInfo || phone.length < 7)
      return;
    dispatch(userActions.accountCheck({ email: null, phone_number: phone }));
  };
  function handleAccountClick(e) {
    if (!tokenInfo) {
      e.preventDefault();
      dispatch(appActions.changePopup(c.PHONE_POPUP));
    }
  }
  function handlePostClick(e, id) {
    if (!id) e.preventDefault();
  }
  function handlePolicyClick(id) {
    if (id) window.location.href = `/tin-tuc/${id}`;
  }
  function handleShowPhonePopup() {
    dispatch(appActions.changePopup(c.PHONE_POPUP));
  }
  function handleLogout() {
    dispatch(userActions.accountLogout());
  }
  function checkToken(e) {
    if (!tokenInfo) {
      e.preventDefault();
      handleShowPhonePopup();
    }
  }
  return (
    <React.Fragment>
      <HotlineContact />
      <div className="top-footer">
        <div className="container row">
          <div className="policy-card"
            onClick={() => handlePolicyClick(appTheme.post_id_terms)}>
            <i className="far fa-clipboard"
              style={{ color: appTheme.color_main_1 }}></i>
            Điều khoản - Điều kiện
          </div>
          <div className="policy-card"
            onClick={() => handlePolicyClick(appTheme.post_id_return_policy)}>
            <i className="fas fa-undo"
              style={{ color: appTheme.color_main_1 }}></i>
            Chính sách đổi trả
          </div>
          <div className="policy-card"
            onClick={() => handlePolicyClick(appTheme.post_id_support_policy)}>
            <i className="far fa-life-ring"
              style={{ color: appTheme.color_main_1 }}></i>
            Chính sách hỗ trợ
          </div>
          <div className="policy-card"
            onClick={() => handlePolicyClick(appTheme.post_id_privacy_policy)}>
            <i className="fas fa-shield-alt"
              style={{ color: appTheme.color_main_1 }}></i>
            Chính sách bảo mật
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="container row">
          <div>

            <div>
              {appTheme.contact_individual_organization_name}
            </div>
            <div>
              {appTheme.title}
            </div>
            {/* <div className="row">
              <input type="text" value={phone} onChange={handlePhoneChange} placeholder="Số điện thoại của bạn" />
              <button onClick={handlePhoneCheck}>Đăng ký</button>
            </div> */}
            <div className="row">
              {
                infoStore.link_google_play != null
                && infoStore.link_google_play !== ""
                && validURL(infoStore.link_google_play)
                &&
                <a href={infoStore.link_google_play}>
                  <img src="/img/play.png" alt="" />
                </a>
              }
              {
                infoStore.link_apple_store != null
                && infoStore.link_apple_store !== ""
                && validURL(infoStore.link_apple_store)
                &&
                <a href={infoStore.link_apple_store}>
                  <img src="/img/app.png" alt="" />
                </a>
              }
            </div>
          </div>
          <div style={{ justifyContent: "space-between" }}>
            <div>
              <h2>
                Liên hệ
              </h2>

              <div>
                <span>Điện thoại:</span> {appTheme.contact_phone_number}
              </div>
              <div>
                <span>Email:</span>  {appTheme.contact_email}
              </div>
              {
                appTheme.contact_time_work == null ? "" : <div>
                  <span>Thời gian làm việc:</span>  {appTheme.contact_time_work}
                </div>
              }
              <div>
                <span>Địa chỉ:</span>  {appTheme.contact_address}
              </div>
              {/* <div className="row" style={{ opacity: 1 }}>
                <button style={{ padding: 0, background: "transparent" }}>
                  <img src="/img/facebook.png" alt="" style={{ height: "28px" }} />
                </button>
                <button style={{ padding: 0, background: "transparent" }}>
                  <img src="/img/zalo.png" alt="" style={{ height: "28px", marginLeft: "8px" }} />
                </button>
              </div> */}
            </div>
            <div>
              <h2>
                Về chúng tôi
              </h2>
              <div>
                <a href={appTheme.post_id_about ? `/tin-tuc/${appTheme.post_id_about}` : "/#"}
                  onClick={(e) => handlePostClick(e, appTheme.post_id_about)}
                >
                  Giới thiệu
                </a>
              </div>
              <div>
                <a href={appTheme.post_id_help ? `/tin-tuc/${appTheme.post_id_help}` : "/#"}
                  onClick={(e) => handlePostClick(e, appTheme.post_id_help)}
                >
                  Giúp đỡ
                </a>
              </div>
              <div>
                <a href={appTheme.post_id_terms ? `/tin-tuc/${appTheme.post_id_terms}` : "/#"}
                  onClick={(e) => handlePostClick(e, appTheme.post_id_terms)}
                >
                  Tham gia
                </a>
              </div>
            </div>
            <div>
              <h2>
                Tài khoản của tôi
              </h2>
              {
                tokenInfo ?
                  <div
                    style={{ opacity: "0.35", cursor: "pointer", lineHeight: "1.5em" }}
                    onClick={handleLogout}>
                    Thoát tài khoản
                  </div>
                  :
                  <div
                    style={{ opacity: "0.35", cursor: "pointer", lineHeight: "1.5em" }}
                    onClick={handleShowPhonePopup}>
                    Đăng nhập
                  </div>
              }
              <div>
                <a href="/don-hang" onClick={checkToken}>
                  Lịch sử đơn hàng
                </a>
              </div>
              <div>
                <a href="/yeu-thich" onClick={checkToken}>
                  Sản phẩm yêu thích
                </a>
              </div>
              {/* <h2>Đăng ký bán hàng</h2>
              <button onClick={() => { window.open("https://doapp.vn/", '_blank').focus(); }}>Đăng ký ngay</button>
             */}
            </div>
          </div>
        </div>
      </div>
      <div className="mobile footer-mobile">

        <div className="footer-icon">
          <a href="/gio-hang" style={{ color: appTheme.color_main_1 }}>
            <div className="cart-number">
              {cartNumber}
            </div>
            <i className="fas fa-shopping-cart"></i>
            Giỏ hàng
          </a>
        </div>
        <div className="footer-icon">
          <a href="/tin-tuc" style={{ color: appTheme.color_main_1 }}>
            <i className="fas fa-scroll"></i>
            Tin tức
          </a>
        </div>
        <div className="footer-icon">
          <a href="/" style={{ color: appTheme.color_main_1 }}>
            <i className="fas fa-home" ></i>
            Trang chủ
          </a>
        </div>
        <div className="footer-icon">
          <a href="/danh-muc" style={{ color: appTheme.color_main_1 }}>
            <i className="fas fa-th-list"></i>
            Danh mục
          </a>
        </div>
        <div className="footer-icon">
          <a href="/tai-khoan" onClick={handleAccountClick} style={{ color: appTheme.color_main_1 }}>
            <i className="fas fa-user"></i>
            Cá nhân
          </a>
        </div>
      </div>
      <div className="text-center" style={{
        backgroundColor: "#111723",
        textAlign: "center",
        color: "#f2f3f8",
        paddingBottom: "10px",
        fontSize: "13px",
      }} >
        Design by <a href="https://doapp.vn" style={{ color: "#f2f3f8", }}>DoApp.vn</a>
      </div>
    </React.Fragment>
  )
}