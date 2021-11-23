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
  const location = useSelector((state) => state.app.location);
  const token = useSelector((state) => state.user.token);
  const badges = useSelector(state => state.user.badges);
  const profile = useSelector((state) => state.user.profile);
  useEffect(() => {
    if (token && cartInfo.status === c.LOADING)
      dispatch(cartActions.getCartInfo());
    if (location.data.length === 0 && location.status === c.LOADING)
      dispatch(appActions.getLocation());
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
    if (!token) {
      e.preventDefault();
      handleShowPhonePopup();
      return;
    }
  }
  return (
    <React.Fragment>
      <div className="header">
        <div className="container">
          <Link to="/" className="logo">
            <img src="/img/1.jpg" alt="" />
          </Link>
          <div
            id="clickbox"
            className="categories-dropdown header-dropdown"
            style={{ display: "block", cursor: "pointer" }}>
            <div
              className="row categories-dropdown-btn"
              onClick={() => handleToggleActive("category")}
            >
              <i className="fas fa-bars"></i>
              <i className="fas fa-chevron-down"></i>
            </div>
            <div
              className={currentActive === "category"
                ? " menu dropdown active"
                : "menu dropdown"}>
              <h3>Danh mục sản phẩm</h3>
              <ul>
                {
                  categories.map((v, i) =>
                    <li key={i}>
                      <Link
                        key={i}
                        onClick={handleCategorySelect}
                        style={{ cursor: "pointer", display: "flex" }}
                        to={`/danh-sach-san-pham?danh-muc=${v.name.replace(/\s/g, "-")}-${v.id}`}>
                        <img src={v.image} alt="" />
                        <div>{v.name}</div>
                      </Link>
                    </li>
                  )
                }
              </ul>
            </div>
          </div>
          <div className="search-bar" onKeyDown={handleEnter}>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              value={searchValue}
              onChange={handleInputChange} />
            <button
              onClick={handleSearch}
            >
              <img src="/img/search.svg" alt="search" />
            </button>
          </div>
          <Link onClick={checkAccount} to="/gio-hang" className="header-btn row">
            <img src="/img/shopping-cart.png" alt="" />
            <div>
              <div className="number">{cartInfo.items.length}</div>
              <div className="title">Giỏ hàng</div>
            </div>
          </Link>
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
          </div>
          {token ?
            (
              <div className="account-info header-dropdown">
                <button
                  style={{ border: "none", padding: 0 }}
                  onClick={() => handleToggleActive("account")}>
                  Tài khoản của tôi
                  <i style={{ marginLeft: "0.5em" }}
                    className="fas fa-caret-down" ></i>
                </button>
                <div className={
                  currentActive === "account"
                    ? "menu dropdown active"
                    : "menu dropdown"}>
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
            )
            :
            (
              <React.Fragment>
                <div>
                  <button onClick={handleShowPhonePopup}>Đăng nhập</button>
                  <button onClick={handleShowPhonePopup}>Đăng ký</button>
                </div>
              </React.Fragment>
            )
          }
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
          >
            <img src="/img/search.svg" alt="search" />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
