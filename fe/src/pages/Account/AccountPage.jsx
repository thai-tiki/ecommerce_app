import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../actions/userActions";
import { constants as c } from "../../constants";
import Header from "../../components/Header";
import PageLoading from "../../components/PageLoading"
function AccountPage() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const status = useSelector(state => state.user.status);
  function handleLogout() {
    dispatch(userActions.accountLogout());
    window.location.href = "/"
  };
  useEffect(() => {
    if (status === c.LOADING)
      dispatch(userActions.getUserProfile());
  })
  return (
    <React.Fragment>
      <Header />
      {
        status === c.SUCCESS ?
          <div className="account-page">
            <div className="account-info">
              <div className="row">
                <div className="avt">
                  {profile.name[0]}
                </div>
                <div style={{ marginLeft: "1em" }}>
                  <div className="name">{profile.name}</div>
                  <div className="email">{profile.email}</div>
                  <div className="phone">{profile.phone_number}</div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "0.5em" }}>
              <div className="link row">
                <img src="/img/coin.png" alt="" />
                <div style={{ marginLeft: "0.75em" }}>
                  <div>Điểm tích lũy</div>
                  <div style={{ marginTop: "4px" }}>Bạn đang có <span>{profile.points} </span> điểm</div>
                </div>
              </div>
              <a href="/ma-giam-gia" className="link row">
                <img src="/img/voucher.svg" alt="" />
                <div style={{ marginLeft: "0.75em" }}>Mã giảm giá</div>
              </a>
            </div>
            <div style={{ marginTop: "0.5em" }}>
              <a href="/dia-chi" className="link row">
                <i className="fas fa-address-book"></i>
                <div style={{ marginLeft: "0.75em" }}>
                  Sổ địa chỉ
                </div>
              </a>
              <a href="/don-hang" className="link row">
                <i className="fas fa-clipboard"></i>
                <div style={{ marginLeft: "0.75em" }}>
                  Quản lý đơn hàng
                </div>
              </a>
              <a href="/danh-gia-cua-toi" className="link row">
                <i className="fas fa-pen-square"></i>
                <div style={{ marginLeft: "0.75em" }}>
                  Đánh giá của tôi
                </div>
              </a>
            </div>
            <div style={{ marginTop: "0.5em" }}>
              <a href="/yeu-thich" className="link row">
                <i className="fas fa-heart"></i>
                <div style={{ marginLeft: "0.75em" }}>
                  Sản phẩm yêu thích
                </div>
              </a>
              <div className="link row">
                <i className="fas fa-tag"></i>
                <div style={{ marginLeft: "0.75em" }}>
                  Mua lại
                </div>
              </div>
            </div>
            <button onClick={handleLogout}>Đăng xuất</button>
          </div>
          : <PageLoading />
      }
    </React.Fragment>
  )
}
export default AccountPage