import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CateroryAddForm from "./CategoryAddForm";
export default function CategoryTab() {
  const categories = useSelector(state => state.category.categories);
  const products = useSelector(state => state.product.list);
  const [currentForm, setCurrentForm] = useState("add");
  function handleEditProduct(p) {
    setCurrentForm("update");
  }
  useEffect(() => {
  }, []);
  const formList = {
    add: <CateroryAddForm />,
  }
  return (
    products.list.length > 0 &&
    <div className="category-tab tab">
      <div className="list-container">
        <div className="row">
          <h4>Danh mục sản phẩm</h4>
        </div>
        <div className="table-fixed">
          <table>
            <thead>
              <tr>
                <th className="id" style={{ width: "70px" }}>No.</th>
                <th className="name">Tên</th>
                <th></th>
              </tr>
            </thead>
            <tbody style={{}}>
              {
                categories.map((v, i) =>
                  <tr key={v._id} onClick={() => handleEditProduct(v)}>
                    <td className="id" style={{ width: "70px" }}>{i + 1}</td>
                    <td className="name">{v.name}</td>
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
      </div>
      {
        formList[currentForm]
      }
    </div>
  )
}