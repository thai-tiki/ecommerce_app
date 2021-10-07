import React, { useEffect, useState } from "react";
import ReceiptTab from "./ReceiptTab";
import BalanceTab from "./BalanceTab";
import BonusTab from "./BonusTab";
export default function StatisticTab(props) {
  const [currentTab, setCurrentTab] = useState("receipt");
  const tabs = {
    receipt: <ReceiptTab orders={props.orders} />,
    balance: <BalanceTab history={props.history} />,
    bonus: <BonusTab bonus={props.bonus} />,
  };

  useEffect(() => {
    if (props.currentTab == "balance") {
      setCurrentTab("balance");
    }

    if (props.currentTab == "receipt") {
      setCurrentTab("receipt");
    }

    if (props.currentTab == "bonus") {
      setCurrentTab("bonus");
    }


  });
  return (
    <div className="statistic-tab">
      <div className="mini-tabs">
        <div
          onClick={() => {
            setCurrentTab("receipt")
            props.setCurrentStatisticTab("receipt")
          }}
          className={currentTab === "receipt" ? "active" : ""}
        >
          <img src="/img/receipt.png" alt="" />
          <span>Đơn hàng đã giới thiệu</span>
        </div>
        <div
          onClick={() => {
            setCurrentTab("balance")
            props.setCurrentStatisticTab("balance")
          }
          }
          className={currentTab === "balance" ? "active" : ""}
        >
          <img src="/img/money-flow.png" alt="" />
          <span>Lịch sử thay đổi số dư</span>
        </div>
        <div
          onClick={() => {
            setCurrentTab("bonus")
            props.setCurrentStatisticTab("bonus")
          }
          }
          className={currentTab === "bonus" ? "active" : ""}
        >
          <img src="/img/success.png" alt="" />
          <span>Thưởng nấc thang</span>
        </div>
      </div>
      {tabs[currentTab]}
    </div>
  );
}
