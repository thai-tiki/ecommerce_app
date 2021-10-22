import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Overview from "./child/Overview";
import ProductTab from "./child/ProductTab";
import TabControll from "./child/TabControll";
import { constants as c } from "../../constants";
import { productActions } from "../../actions/productActions";
function AdminPage(props) {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.list);
  const [currentTab, setCurrentTab] = useState("product");
  const tabs = {
    "product": <ProductTab />
  };
  useEffect(() => {
    document.title = "Quản lý";
    document.getElementsByTagName("BODY")[0].style.height = "100vh";
    document.getElementsByTagName("BODY")[0].style.overflow = "hidden"
    if (products.status === c.LOADING)
      dispatch(productActions.getAllProducts(""))
  }, [])
  return (
    <div className="admin-page">
      <TabControll onChange={setCurrentTab} />
      <div className="main-view">
        <Overview />
        {tabs[currentTab]}
      </div>
    </div>
  )
}
export { AdminPage }