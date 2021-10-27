import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatPrice } from "../../../helper";
import ProductAddForm from "./ProductAddForm";
import ProductUpdateForm from "./ProductUpdateForm";
export default function ProductTab() {
  const products = useSelector(state => state.product.list);
  const [currentForm, setCurrentForm] = useState("");
  const [currentProduct, setCurrentProduct] = useState(null);
  function handleAddProduct() {
    setCurrentForm("add")
  }
  function handleEditProduct(p) {
    setCurrentForm("update");
    setCurrentProduct(p);
  }
  function closeForm() {
    setCurrentForm("none")
  }
  useEffect(() => {
  }, []);
  const formList = {
    add: <ProductAddForm handleClose={closeForm} />,
    update: <ProductUpdateForm product={currentProduct} handleClose={closeForm} />,
    none: <div />
  }
  return (
    products.list.length > 0 &&
    <div className="product-tab tab">
      <div className="row">
        <h4>Quản lý sản phẩm</h4>
        <button
          onClick={handleAddProduct}>
          Sản phẩm mới <i className="fas fa-plus"></i>
        </button>
      </div>
      <div className="table-fixed">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th style={{ maxWidth: "240px" }}>Tên</th>
              <th>Loại</th>
              <th>Giá gốc</th>
              <th>Giá sau giảm</th>
              <th></th>
            </tr>
          </thead>
          <tbody style={{}}>
            {
              products.list.map((v, i) =>
                <tr key={v._id} onClick={() => handleEditProduct(v)}>
                  <td style={{ width: "45px" }}>{i + 1}</td>
                  <td style={{ maxWidth: "240px", paddingRight: "16px" }}>{v.name}</td>
                  <td style={{ maxWidth: "150px" }}>{v.categories[0].name}</td>
                  <td>{formatPrice(v.before_discount_price)}</td>
                  <td>{formatPrice(v.after_discount_price)}</td>
                  <td>
                    <button>
                      <i className="far fa-edit"></i>
                    </button>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      {
        formList[currentForm]
      }
    </div>
  )
}