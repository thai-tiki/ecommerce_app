import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNextElement } from "../../helper";
import { constants as c } from "../../constants";
import { productActions as a } from "../../actions/productActions";
import { CategoriesColumn } from "../../components/CategoriesColumn";
import Header from "../../components/Header";
import Select from "../../components/Select";
import Paginate from "../../components/Paginate";
import ProductCard from "../../components/ProductCard";
import PageLoading from "../../components/PageLoading";
function ProductsListPage(props) {
  const dispatch = useDispatch();
  let query = queryString.parse(props.location.search);
  const pageInfo = useSelector(state => state.product.list);
  const categories = useSelector((state) => state.category.list);
  const [prevLocation, setPrevLocation] = useState(props.location.state);
  const [currentQuery, setCurrentQuery] = useState(createQueryString(query));
  const sortValues = [
    {
      title: "Giá tiền: Tăng dần",
      sort_by: "price",
      descending: "false"
    },
    {
      title: "Giá tiền: Giảm dần",
      sort_by: "price",
      descending: "true"
    }
  ];
  function createQueryString(option) {
    let keys = [...Object.keys(option)];
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== "title") {
        if (keys[i] === "danh-muc") {
          let arr = option[keys[i]].split("-");
          let id = arr[arr.length - 1];
          query["categories"] = id;
        }
        if (keys[i] === "ten") {
          query["name"] = query.ten;
        }
        else
          query[keys[i]] = option[keys[i]];
      }
    }
    let queryKeys = [...Object.keys(query)];
    let queryStr = queryKeys.reduce((rs, v) => `${rs}${v}=${query[v]}&`, "?");
    return queryStr;
  }
  useEffect(() => {
    document.title = "Danh sách sản phẩm";
    let queryStr = createQueryString(query);
    if ((queryStr !== currentQuery || prevLocation !== window.location.pathname)) {
      dispatch({ type: c.RESET_PRODUCTS_LIST_STATUS });
      setCurrentQuery(queryStr);
      setPrevLocation(window.location.pathname);
    } else
      if (pageInfo.status === c.LOADING) {
        dispatch(a.getAllProducts(queryStr));
      }
  }, [props.location.search, pageInfo]);
  function handleSort(option) {
    let keys = [...Object.keys(option)];
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== "title")
        query[keys[i]] = option[keys[i]];
    }
    let queryKeys = [...Object.keys(query)];
    let queryStr = queryKeys.reduce((rs, v) => `${rs}${v}=${query[v]}&`, "?");
    window.location.href = window.location.origin + window.location.pathname + queryStr
  }
  return (
    pageInfo.status === c.SUCCESS
      ?
      <React.Fragment>
        <Header />
        <div className="products-list-page container">
          <div className="mobile-tool mobile">
            <Select
              values={sortValues}
              placeholder="Sắp xếp"
              handleSelect={handleSort}
              showDetail={showNextElement} />
          </div>
          <div className="row">
            <CategoriesColumn categories={categories.data} title="Danh mục" />
            <div className="products-list">
              <div className="sort-option row">
                <span>
                </span>
                <Select
                  placeholder="Sắp xếp"
                  handleSelect={handleSort}
                  showDetail={showNextElement}
                  values={sortValues}
                />
              </div>
              <div className="row">
                {
                  pageInfo.list.map((v, i) =>
                    <ProductCard
                      key={i}
                      product={v}
                    />)
                }
              </div>
              <Paginate
                handlePageSelect={handleSort}
                totalPage={pageInfo.totalPage}
                currentPage={pageInfo.currentPage}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
      : <PageLoading />
  )
}
export default ProductsListPage