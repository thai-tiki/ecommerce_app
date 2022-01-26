import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { constants as c } from "../../constants";
import { appActions as a } from "../../actions/appActions";
import Overview from "./child/Overview";
import OrderTab from "./child/OrderTab";
import ProductTab from "./child/ProductTab";
import VoucherTab from "./child/VoucherTab";
import TabControll from "./child/TabControll";
import CategoryTab from "./child/CategoryTab";
import NewsTab from "./child/NewsTab";
import Loading from "./child/Loading";
function AdminPage(props) {
  const dispatch = useDispatch();
  const shopInfo = useSelector(state => state.app.admin);
  const [currentTab, setCurrentTab] = useState(props.location.hash ? props.location.hash.replace("#", "") : "product");
  const tabs = {
    "product": <ProductTab />,
    "category": <CategoryTab />,
    "order": <OrderTab />,
    "news": <NewsTab />,
    "voucher": <VoucherTab />
  };
  useEffect(() => {
    document.title = "Quản lý";
    document.getElementsByTagName("BODY")[0].style.height = "100vh";
    document.getElementsByTagName("BODY")[0].style.overflow = "hidden";
    if (shopInfo.status === c.LOADING)
      dispatch(a.getAdminInfo());
    return () => {
      document.getElementsByTagName("BODY")[0].style.height = "unset";
      document.getElementsByTagName("BODY")[0].style.overflow = "auto"
    }
  }, [])
  return (
    <div className="admin-page">
      <TabControll onChange={setCurrentTab} current={currentTab} />
      <div className="main-view">
        {
          shopInfo.status === c.SUCCESS &&
          <>
            <Overview info={shopInfo.overall} />
            {tabs[currentTab]}
          </>
        }
        {
          shopInfo.status === c.LOADING &&
          <div style={{ width: "100%", height: "100%" }}>
            <Loading />
          </div>
        }
      </div>
    </div>
  )
}
export { AdminPage }