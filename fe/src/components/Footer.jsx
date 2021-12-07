import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { appActions } from "../actions/appActions";
import { constants as c } from "../constants";
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
  function handleShowPhonePopup() {
    dispatch(appActions.changePopup(c.PHONE_POPUP));
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
          <div className="policy-card" >
            <i className="far fa-clipboard" ></i>
            Điều khoản - Điều kiện
          </div>
          <div className="policy-card" >
            <i className="fas fa-undo" ></i>
            Chính sách đổi trả
          </div>
          <div className="policy-card" >
            <i className="far fa-life-ring"
            ></i>
            Chính sách hỗ trợ
          </div>
          <div className="policy-card" >
            <i className="fas fa-shield-alt"
            ></i>
            Chính sách bảo mật
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="container row">
          <div>
            <div className="logo">
              <img src="/img/3.png" alt="" />
              <div>
                <h4>Magento ®</h4>
                <span>Mua sắm theo cách của bạn !</span>
              </div>
            </div>
            <div className="row">
              <img src="/img/play.png" alt="" />
              <img src="/img/app.png" alt="" />
            </div>
          </div>
          <div style={{ justifyContent: "space-between" }}>
            <div>
              <h2>
                Liên hệ
              </h2>
              <div>
                <span>Địa chỉ:</span>  Z06, Đường 13, P. Tân Thuận Đông, Q.7, Tp.HCM
              </div>
              <div>
                <span>Điện thoại:</span> 0357-857-086
              </div>
              <div>
                <span>Email:</span>  magento@email.vn
              </div>
            </div>
            <div>
              <h2>
                Về chúng tôi
              </h2>
              <div>
                <a href={"/#"} >
                  Giới thiệu
                </a>
              </div>
              <div>
                <a href={"/#"} >
                  Giúp đỡ
                </a>
              </div>
              <div>
                <a href={"/#"} >
                  Tham gia
                </a>
              </div>
            </div>
            <div>
              <h2>
                Tài khoản của tôi
              </h2>
              <div>
                <a href="/dia-chi" onClick={checkToken}>
                  Địa chỉ nhận hàng
                </a>
              </div>
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