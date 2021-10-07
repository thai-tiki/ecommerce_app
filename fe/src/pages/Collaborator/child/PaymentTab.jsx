import { useState } from "react";
import { useSelector } from "react-redux";
import InfoPopup from "./InfoPopup";
import { handleImgErr, formatPrice } from "../../../helper";
export default function PaymentTab(props) {
  const {
    first_and_last_name,
    bank,
    branch,
    account_name,
    account_number,
    back_card,
    front_card,
    cmnd,
  } = props.account;
  const {
    payment_limit,
    has_payment_request,
    payment_1_of_month,
    payment_16_of_month,
  } = props.info;
  const appTheme = useSelector((state) => state.app.appTheme);
  const [customClass, setcustomClass] = useState("");
  function handleShowPopup() {
    setcustomClass("center");
  }
  function handleClosePopup() {
    setcustomClass("");
  }

  function getContentPayment() {

    
    if (payment_1_of_month == true && payment_16_of_month == true) {
      return "ngày 1 và ngày 16";
    }
    if (payment_1_of_month == true) {
      return "ngày 1";
    }
    if (payment_16_of_month == true) {
      return "ngày 16";
    }
    return "";
  };
  return (
    <div className="payment-tab">
      <div className="payment-info">
        <div className="top">
          <img src="/img/wallet.png" alt="" />
          <span>Thông tin thanh toán</span>
        </div>
        <div className="content">
          <div className="row">
            <label>Tên: </label>
            <span>{first_and_last_name}</span>
          </div>
          <div className="row">
            <label>Ngân hàng: </label>
            <span>{bank}</span>
          </div>
          <div className="row">
            <label>Chi nhánh: </label>
            <span>{branch}</span>
          </div>
          <div className="row">
            <label>Tên tài khoản: </label>
            <span>{account_name}</span>
          </div>
          <div className="row">
            <label>Số tài khoản: </label>
            <span>{account_number}</span>
          </div>
          <div className="row">
            <label>CMND/CCCD: </label>
            <div>
              <span>{cmnd}</span>
              <div className="idcard-img row">
                <div style={{ marginRight: "1em", marginTop: "0.5em" }}>
                  <label>Mặt trước: </label>
                  <div className="image">
                    <div className="img-container">
                      <img src={back_card} alt="" onError={handleImgErr} />
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "0.5em" }}>
                  <label>Mặt sau: </label>
                  <div className="image">
                    <div className="img-container">
                      <img src={front_card} alt="" onError={handleImgErr} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleShowPopup}
            style={{ background: appTheme.color_main_1 }}
          >
            Cập nhật thông tin
          </button>
        </div>
      </div>
      <div className="payment-policy">
        <div>
          <div className="top">
            <img src="/img/rules.png" alt="" />
            <span>Chính sách thanh toán</span>
          </div>
          <div className="content">
            <div>
              Tiền từ ví CTV của thành viên Dinamol sẽ được thanh toán định kỳ
            </div>
            <span>
              Lưu ý: <br />
              &nbsp;&nbsp;&nbsp;&nbsp; - Bạn cần có số dư tối thiểu là{" "}
              <b>{formatPrice(payment_limit)} VNĐ</b> để được thanh toán định kỳ
            </span>

            {getContentPayment() != "" ? (
              <span>
                Lưu ý: <br />
                &nbsp;&nbsp;&nbsp;&nbsp; - Shop sẽ lên danh sách và thanh toán định kỳ vào <b>{getContentPayment()}</b> hàng tháng
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        {!has_payment_request ? (
          <button
            onClick={!has_payment_request && props.onRequestPayment}
            style={{ background: appTheme.color_main_1 }}
          >
            Gửi yêu cầu thanh toán
          </button>
        ) : (
          <button style={{ background: appTheme.color_main_1 }}>
            Đã gửi yêu cầu thanh toán
          </button>
        )}
        <label>
          Gửi yêu cầu thanh toán trước ít nhất 3 ngày trước thời hạn thanh toán
        </label>
      </div>
      <InfoPopup
        customClass={customClass}
        info={props.account}
        onClose={handleClosePopup}
      />
    </div>
  );
}
