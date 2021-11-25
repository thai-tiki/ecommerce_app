import { useEffect, useState } from "react";
import Overview from "./child/Overview";
import OrderTab from "./child/OrderTab";
import ProductTab from "./child/ProductTab";
import VoucherTab from "./child/VoucherTab";
import TabControll from "./child/TabControll";
import CategoryTab from "./child/CategoryTab";
import NewsTab from "./child/NewsTab";
function AdminPage(props) {
  const [currentTab, setCurrentTab] = useState("product");
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
    document.getElementsByTagName("BODY")[0].style.overflow = "hidden"
    return () => {
      document.getElementsByTagName("BODY")[0].style.height = "unset";
      document.getElementsByTagName("BODY")[0].style.overflow = "auto"
    }
  }, [])
  return (
    <div className="admin-page">
      <TabControll onChange={setCurrentTab} current={currentTab} />
      <div className="main-view">
        <Overview />
        {tabs[currentTab]}
      </div>
    </div>
  )
}
export { AdminPage }