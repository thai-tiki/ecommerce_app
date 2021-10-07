import React from "react";
import { formatPrice } from "../../../helper";
export default function InfoTab(props) {
  const {
    share_collaborator,
    balance,
    total_final,
    number_order,
    steps_bonus,
  } = props.info;
  const { setCurrentTab, setCurrentStatisticTab } = props;
  return (
    <React.Fragment>
      <div className="row">
        <h4>Số dư: </h4>
        &nbsp;&nbsp;
        <h4 style={{ color: "DodgerBlue " }}> {formatPrice(balance)}đ</h4>
        &nbsp;&nbsp;
        <i
        style={{ color: "DodgerBlue " }}
          class="fas fa-info-circle"
          aria-hidden="true"
          onClick={() => {
              setCurrentTab("statistic");
              setCurrentStatisticTab("balance");
            }}
        ></i>
      </div>
      <div className="info-tab">
        <div className="column">
          <div
            className="income-card"
            onClick={() => {
              setCurrentTab("statistic");
              setCurrentStatisticTab("receipt");
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src="/img/commission.png" alt="" />
              <span>Hoa hồng tháng này</span>
            </div>
            <div className="row">
              <div>{number_order} Đơn hàng</div>
              <div>{formatPrice(share_collaborator)} đ</div>
            </div>
          </div>

          <div
            className="income-card"
            onClick={() => {
              setCurrentTab("statistic");
              setCurrentStatisticTab("receipt");
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src="/img/receipt.png" alt="" />
              <span>Doanh số tháng này</span>
            </div>
            <div className="row">
              <div>{number_order} Đơn hàng</div>
              <div>{formatPrice(total_final)} đ</div>
            </div>
          </div>
        </div>
        <div className="table">
          <div className="top">
            <img src="/img/gift.png" alt="" />
            <span>Thưởng doanh thu</span>
          </div>
          <div className="content">
            {steps_bonus.map((v, i) => (
              <div className="data row" key={i}>
                <div className="row center">
                  <img src="/img/gift-box (2).png" alt="" />
                  <div>Doanh thu {formatPrice(v.limit)}₫</div>
                </div>
                <div>
                  <span>Thưởng {formatPrice(v.bonus)}₫</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
