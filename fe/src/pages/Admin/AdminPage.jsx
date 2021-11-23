import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Overview from "./child/Overview";
import ProductTab from "./child/ProductTab";
import OrderTab from "./child/OrderTab";
import TabControll from "./child/TabControll";
import CategoryTab from "./child/CategoryTab";
import { constants as c } from "../../constants";
import { productActions } from "../../actions/productActions";
import NewsTab from "./child/NewsTab";
function AdminPage(props) {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.list);
  const [currentTab, setCurrentTab] = useState("product");
  const tabs = {
    "product": <ProductTab />,
    "category": <CategoryTab />,
    "order": <OrderTab />,
    "news": <NewsTab />
  };
  useEffect(() => {
    document.title = "Quản lý";
    document.getElementsByTagName("BODY")[0].style.height = "100vh";
    document.getElementsByTagName("BODY")[0].style.overflow = "hidden"
    if (products.status === c.LOADING)
      dispatch(productActions.getAllProducts(""));
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