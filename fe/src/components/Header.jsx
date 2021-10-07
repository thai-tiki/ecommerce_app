import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { constants as c } from "../constants";
import { appActions } from "../actions/appActions";
import { userActions } from "../actions/userActions";
import { cartActions } from "../actions/cartActions";
export default function Header() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [currentActive, setCurrentActive] = useState("");
  const cartInfo = useSelector((state) => state.cart.cartInfo);
  const categories = useSelector((state) => state.category.categories);
  const provincesList = useSelector((state) => state.app.addressData.provinces);
  const addressStatus = useSelector((state) => state.app.addressData.status);
  const tokenInfo = useSelector((state) => state.user.tokenInfo);
  const appTheme = useSelector((state) => state.app.appTheme);
  const profile = useSelector((state) => state.user.profile);
  const notify = useSelector((state) => state.user.notify);
  const badges = useSelector((state) => state.user.badges);
  const boxChatState = useSelector((state) => state.user.boxChatState);
  useEffect(() => {
    if (badges.status === c.LOADING) {
      dispatch(userActions.getUserBadges());
    }
    if (tokenInfo && cartInfo.status === c.LOADING) {
      dispatch(cartActions.getCartInfo());
    }
    if (tokenInfo && notify.status === c.LOADING) {
      dispatch(userActions.getuserNotify());
    }
    if (provincesList.length === 0 && addressStatus === c.LOADING) {
      dispatch(appActions.getProvincesList());
    }
    if (tokenInfo && profile.status === c.LOADING) {
      dispatch(userActions.getUserProfile());
    }
    window.addEventListener("click", function (e) {
      let containers = document.querySelectorAll(".header-dropdown");
      for (let i = 0; i < containers.length; i++) {
        if (containers[i].contains(e.target)) return;
      }
      setCurrentActive("");
    });
  }, []);
  function handleInputChange(e) {
    setSearchValue(e.target.value);
  }
  function handleSearch() {
    if (searchValue !== "")
      window.location.href =
        window.location.origin + "/danh-sach-san-pham?search=" + searchValue;
  }
  function handleEnter(e) {
    if (e.key === "Enter") handleSearch();
  }
  function handleShowPhonePopup() {
    dispatch(appActions.changePopup(c.PHONE_POPUP));
  }
  function handleLogout() {
    dispatch(userActions.accountLogout());
  }
  function handleShowProfile() {
    dispatch(appActions.changePopup(c.PROFILE_POPUP));
  }
  function handleCategorySelect() {
    toggleMenu(".categories-dropdown");
  }
  function toggleMenu(selector) {
    const menuToggle = document.querySelector(`${selector} .menu`);
    menuToggle.classList.toggle("active");
  }
  function handleToggleActive(type) {
    if (currentActive === type) {
      setCurrentActive("");
      return;
    }
    setCurrentActive(type);
  }
  function checkAccount(e) {
    if (!tokenInfo) {
      e.preventDefault();
      handleShowPhonePopup();
      return;
    }
  }
  function handleNotificationClick(v) {
    handleToggleActive("notify");
    if (v.type === "NEW_MESSAGE") {
      dispatch(appActions.setChatStatus("active"));
      return;
    }
    let arr = v.title.split(" ");
    let orderID = arr[arr.length - 1];
    window.location.href = `/don-hang/${orderID}`;
  }
  return (
    <React.Fragment>
      <div
        className="header"
        style={{ background: appTheme.headerBackgroudColor }}
      >
        <div className="container">
          <Link to="/" className="logo">
            <img src={appTheme.logo_url} alt="" />
          </Link>
          <div
            id="clickbox"
            className="categories-dropdown header-dropdown"
            style={{ display: "block", cursor: "pointer" }}
          >
            <div
              className="row categories-dropdown-btn"
              onClick={() => handleToggleActive("category")}
            >
              <i className="fas fa-bars"></i>
              <i className="fas fa-chevron-down"></i>
            </div>
            <div
              className={
                currentActive === "category"
                  ? " menu dropdown active"
                  : "menu dropdown"
              }
            >
              <h3>Danh mục sản phẩm</h3>
              <ul>
                {categories.map((v, i) => (
                  <li key={i}>
                    <Link
                      key={i}
                      onClick={handleCategorySelect}
                      style={{ cursor: "pointer", display: "flex" }}
                      to={`/danh-sach-san-pham?danh-muc=${v.name.replace(
                        /\s/g,
                        "-"
                      )}-${v.id}`}
                    >
                      <img
                        src={v.image_url}
                        alt=""
                        style={{
                          width: "30px",
                          objectFir: "contain",
                          marginRight: "8px",
                        }}
                      />
                      <div>{v.name}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="search-bar" onKeyDown={handleEnter}>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              value={searchValue}
              onChange={handleInputChange}
            />
            <button
              onClick={handleSearch}
              style={{ background: appTheme.color_main_1 }}
            >
              <img src="/img/search.svg" alt="search" />
            </button>
          </div>

          <Link to="/gio-hang" className="header-btn row">
            <img src="/img/shopping-cart.png" alt="" />
            <div>
              {badges.cart_quantity == 0 ? (
                <div
                  style={{
                    margin: 18,
                  }}
                >
                  {null}
                </div>
              ) : (
                <div className="number">{badges.cart_quantity}</div>
              )}
              <div className="title">Giỏ hàng</div>
            </div>
          </Link>

          <div className="row">
            {!tokenInfo ? (
              ""
            ) : (
              <div className="notify header-dropdown">
                <div
                  onClick={() => handleToggleActive("notify")}
                  className="header-btn row"
                >
                  <img src="/img/bell (1).png" alt="" />
                  <div style={{ width: "70px" }}>
                    {notify.total_unread === 0 ? (
                      <div
                        style={{
                          margin: 18,
                        }}
                      >
                        {null}
                      </div>
                    ) : (
                      <div className="number">{notify.total_unread}</div>
                    )}
                    <div className="title">Thông báo</div>
                  </div>
                </div>
                <div
                  className={
                    currentActive === "notify"
                      ? "menu dropdown active"
                      : "menu dropdown"
                  }
                >
                  <h3>Thông báo mới</h3>
                  <div className="column hide-scroll">
                    {notify.data.map((v, i) => (
                      <button
                        key={i}
                        className="item"
                        style={{ width: "100%", float: "left" }}
                        onClick={() => handleNotificationClick(v)}
                      >
                        <div className="title" style={{ textAlign: "left" }}>
                          {v.title}
                        </div>
                        <div className="content" style={{ textAlign: "left" }}>
                          {v.content}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {!tokenInfo ? (
              ""
            ) : (
              <Link
                to="/yeu-thich"
                onClick={checkAccount}
                className="header-btn row"
              >
                <img src="/img/heart1.png" alt="" />
                <div>
                  {badges.favorite_products == 0 ? (
                    <div
                      style={{
                        margin: 18,
                      }}
                    >
                      {null}
                    </div>
                  ) : (
                    <div className="number">{badges.favorite_products}</div>
                  )}
                  <div className="title">Yêu thích</div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="nav">
        <div className="container">
          <div className="row">
            <div className="dropdown-container" style={{ width: "110px" }}>
              <Link
                className="dropdown-title"
                style={{ marginLeft: 0 }}
                to={{
                  pathname: "/",
                  state: { prevPath: window.location.pathname },
                }}
              >
                Trang chủ
              </Link>
            </div>
            <div className="dropdown-container" style={{ width: "90px" }}>
              <Link
                className="dropdown-title"
                style={{ marginLeft: 0 }}
                to={{
                  pathname: "/danh-sach-san-pham",
                  state: { prevPath: window.location.pathname },
                }}
              >
                Sản phẩm
              </Link>
            </div>
            <div className="dropdown-container" style={{ width: "90px" }}>
              <Link
                className="dropdown-title"
                to={{
                  pathname: "/tin-tuc",
                  state: { prevPath: window.location.pathname },
                }}
              >
                Tin tức
              </Link>
            </div>
            <div className="dropdown-container" style={{ width: "90px" }}>
              <Link
                className="dropdown-title"
                to={{
                  pathname: "/ma-giam-gia",
                  state: { prevPath: window.location.pathname },
                }}
              >
                Voucher
              </Link>
            </div>
            <div
              className="dropdown-container"
              style={{ width: "fit-content" }}
            >
              <Link
                className="dropdown-title"
                to={{
                  pathname: "/combo-giam-gia",
                  state: { prevPath: window.location.pathname },
                }}
              >
                Combo giảm giá
              </Link>
            </div>
          </div>
          {tokenInfo ? (
            <div className="account-info header-dropdown">
              <button
                style={{ border: "none", padding: 0 }}
                onClick={() => handleToggleActive("account")}
              >
                Tài khoản của tôi
                <i
                  style={{ marginLeft: "0.5em" }}
                  className="fas fa-caret-down"
                ></i>
              </button>
              <div
                className={
                  currentActive === "account"
                    ? " menu dropdown active"
                    : "menu dropdown"
                }
              >
                <h3>
                  {profile.name} <br />
                  <span>{profile.phone_number}</span>
                </h3>
                <ul>
                  <li>
                    <img src="/img/check-list.png" alt="" />
                    <Link to="/don-hang">Đơn hàng của tôi</Link>
                  </li>
                  <li>
                    <img src="/img/home.png" alt="" />
                    <Link to="/dia-chi">Địa chỉ nhận hàng</Link>
                  </li>
                  <li>
                    <img src="/img/star.png" alt="" />
                    <Link to="/san-pham-da-mua">Sản phẩm đã mua</Link>
                  </li>
                  <li>
                    <img src="/img/check-mark.png" alt="" />
                    <Link to="/danh-gia-cua-toi">Đánh giá của tôi</Link>
                  </li>
                  <li>
                    <img src="/img/heart.png" alt="" />
                    <Link to="/yeu-thich">Sản phẩm yêu thích</Link>
                  </li>
                  {profile.is_collaborator && (
                    <li>
                      <img src="/img/handshake.png" alt="" />
                      <Link to="/cong-tac-vien">Ví cộng tác viên</Link>
                    </li>
                  )}
                  <li onClick={handleShowProfile}>
                    <img src="/img/refresh.png" alt="" />
                    Cập nhật thông tin
                  </li>
                  <li onClick={handleLogout}>
                    <img src="/img/log-out.png" alt="" />
                    Thoát tài khoản
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <React.Fragment>
              <div>
                <button onClick={handleShowPhonePopup}>Đăng nhập</button>
                <button onClick={handleShowPhonePopup}>Đăng ký</button>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
      <div className="mobile mobile-header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Tìm sản phẩm"
            value={searchValue}
            onChange={handleInputChange}
          />
          <button
            onClick={handleSearch}
            style={{ background: appTheme.color_main_1 }}
          >
            <img src="/img/search.svg" alt="search" />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
