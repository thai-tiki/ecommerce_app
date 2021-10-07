import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InfoTab from "./child/InfoTab";
import PaymentTab from "./child/PaymentTab";
import Header from "../../components/Header";
import StatisticTab from "./child/StatisticTab";
import { constants as c } from "../../constants";
import PageLoading from "../../components/PageLoading";
import { collaboratorActions as a } from "../../actions/collaboratorActions";
function CollaboratorPage(props) {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.collaborator.account);
  const history = useSelector((state) => state.collaborator.history);
  const bonus = useSelector((state) => state.collaborator.bonus);
  const orders = useSelector((state) => state.collaborator.orders);
  const info = useSelector((state) => state.collaborator.info);
  const [currentTab, setCurrentTab] = useState("info");
  const [currentStatisticTab, setCurrentStatisticTab] = useState("receipt");
  const tabs = {
    info: (
      <InfoTab
        info={info}
        setCurrentTab={setCurrentTab}
        setCurrentStatisticTab={setCurrentStatisticTab}
      />
    ),
    payment: (
      <PaymentTab
        info={info}
        account={account}
        onRequestPayment={requestPayment}
      />
    ),
    statistic: (
      <StatisticTab
        orders={orders}
        history={history}
        bonus={bonus}
        currentTab={currentStatisticTab}
        setCurrentStatisticTab={setCurrentStatisticTab2}
      />
    ),
  };
  function setCurrentStatisticTab2(va) {
    setCurrentStatisticTab(va);
  }
  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.title = "Cộng tác viên";
    if (account.status === c.LOADING) {
      dispatch(a.getAccountInfo());
    }
    if (info.status === c.LOADING) {
      dispatch(a.getInfo());
    }
    if (orders.status === c.LOADING) {
      dispatch(a.getSharedOrder(""));
    }
    if (history.status === c.LOADING) {
      dispatch(a.getBalanceHistory());
    }
    if (bonus.status === c.LOADING) {
      dispatch(a.getBonusHistory());
    }
  }, []);
  function requestPayment() {
    dispatch(a.requestPayment());
  }
  return (
    <React.Fragment>
      <Header />
      {account.status === c.SUCCESS ? (
        <div className="collaborator-page">
          <div className="container">
            <div className="row tabs">
              <div
                onClick={() => setCurrentTab("info")}
                className={currentTab === "info" ? "active" : ""}
              >
                Thông tin ví
              </div>
              <div
                onClick={() => setCurrentTab("statistic")}
                className={currentTab === "statistic" ? "active" : ""}
                style={{ marginLeft: "1.5em", marginRight: "1.5em" }}
              >
                Thống kê
              </div>
              <div
                onClick={() => setCurrentTab("payment")}
                className={currentTab === "payment" ? "active" : ""}
              >
                Thanh toán
              </div>
            </div>
            {tabs[currentTab]}
          </div>
        </div>
      ) : (
        <PageLoading />
      )}
    </React.Fragment>
  );
}
export { CollaboratorPage };
