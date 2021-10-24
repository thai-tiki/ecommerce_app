import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { appActions } from "../actions/appActions";
import { userActions } from "../actions/userActions";
import { constants as c } from "../constants";
import { validURL } from "../helper";
export default function Footer() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const cartInfo = useSelector(state => state.cart.cartInfo);
  const cartNumber = cartInfo ? cartInfo.items.length : 0;
  function handleAccountClick(e) {
    if (!token) {
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
    if (!token) {
      e.preventDefault();
      handleShowPhonePopup();
    }
  }
  return (
    <React.Fragment>
      <div className="top-footer">
        <div className="container row">
          <div className="policy-card"
            onClick={() => handlePolicyClick(1)}>
            <i className="far fa-clipboard" ></i>
            Điều khoản - Điều kiện
          </div>
          <div className="policy-card"
            onClick={() => handlePolicyClick(1)}>
            <i className="fas fa-undo" ></i>
            Chính sách đổi trả
          </div>
          <div className="policy-card"
            onClick={() => handlePolicyClick(1)}>
            <i className="far fa-life-ring"
            ></i>
            Chính sách hỗ trợ
          </div>
          <div className="policy-card"
            onClick={() => handlePolicyClick(1)}>
            <i className="fas fa-shield-alt"
            ></i>
            Chính sách bảo mật
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="container row">
          <div>
            <div>
              {"contact_individual_organization_name"}
            </div>
            <div>
              {"title"}
            </div>
            <div className="row">
              {
                <a href={'#'}>
                  <img src="/img/play.png" alt="" />
                </a>
              }
              {
                <a href={"#"}>
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
                <span>Điện thoại:</span> {"contact_phone_number"}
              </div>
              <div>
                <span>Email:</span>  {'contact_email'}
              </div>
              <div>
                <span>Địa chỉ:</span>  {"contact_address"}
              </div>
            </div>
            <div>
              <h2>
                Về chúng tôi
              </h2>
              <div>
                <a href={"/#"}
                  onClick={(e) => handlePostClick(1)}
                >
                  Giới thiệu
                </a>
              </div>
              <div>
                <a href={"/#"}
                  onClick={(e) => handlePostClick(1)}
                >
                  Giúp đỡ
                </a>
              </div>
              <div>
                <a href={"/#"}
                  onClick={(e) => handlePostClick(1)}
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
                token ?
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
          <a href="/gio-hang" >
            <div className="cart-number">
              {cartNumber}
            </div>
            <i className="fas fa-shopping-cart"></i>
            Giỏ hàng
          </a>
        </div>
        <div className="footer-icon">
          <a href="/tin-tuc" >
            <i className="fas fa-scroll"></i>
            Tin tức
          </a>
        </div>
        <div className="footer-icon">
          <a href="/" >
            <i className="fas fa-home" ></i>
            Trang chủ
          </a>
        </div>
        <div className="footer-icon">
          <a href="/danh-muc" >
            <i className="fas fa-th-list"></i>
            Danh mục
          </a>
        </div>
        <div className="footer-icon">
          <a href="/tai-khoan" onClick={handleAccountClick} >
            <i className="fas fa-user"></i>
            Cá nhân
          </a>
        </div>
      </div>
    </React.Fragment>
  )
}