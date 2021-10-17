import { useEffect, useState } from "react";
import ProductTab from "./child/ProductTab";
import TabControll from "./child/TabControll";
function AdminPage(props) {
  const [currentTab, setCurrentTab] = useState("product");
  const tabs = {
    "product": <ProductTab />
  };
  useEffect(() => {
    document.title = "Quản lý"
  })
  return (
    <div className="admin-page">
      <TabControll onChange={setCurrentTab} />
      <div className="main-view">
        <div className="overview">
          <div>

          </div>
          <div>

          </div>
          <div>

          </div>
        </div>
        {tabs[currentTab]}
      </div>
    </div>
  )
}
export { AdminPage }