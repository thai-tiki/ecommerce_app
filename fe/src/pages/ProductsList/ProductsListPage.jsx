import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Select from "../../components/Select";
import { showNextElement } from "../../helper";
import { constants as c } from "../../constants";
import Paginate from "../../components/Paginate";
import ProductCard from "../../components/ProductCard";
import PageLoading from "../../components/PageLoading";
import { productActions as a } from "../../actions/productActions";
function ProductsListPage(props) {
  const dispatch = useDispatch();
  let query = queryString.parse(props.location.search);
  const pageInfo = useSelector(state => state.product.list);
  const categories = useSelector((state) => state.category.categories);
  const [prevLocation, setPrevLocation] = useState(props.location.state);
  const [currentQuery, setCurrentQuery] = useState(createQueryString(query));
  function createQueryString(option) {
    let keys = [...Object.keys(option)];
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== "title") {
        if (keys[i] === "danh-muc") {
          let arr = option[keys[i]].split("-");
          let id = arr[arr.length - 1];
          query["category_ids"] = id;
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
            <span>
              Có {pageInfo.total} sản phẩm
            </span>
            <Select
              placeholder="Sắp xếp"
              handleSelect={handleSort}
              showDetail={showNextElement}
              values={[
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
              ]}
            />
          </div>
          <div className="row">
            <div className="categories-column">
              <div className="main-title">
                <h3>Danh mục</h3>
              </div>
              <div className="column">
                {
                  categories.map((v, i) =>
                    <Link
                      key={i}
                      style={{ cursor: "pointer", display: "flex" }}
                      to={`/danh-sach-san-pham?danh-muc=${v.name.replace(/\s/g, "-")}-${v.id}`}>
                      <div className="image">
                        <div className="img-container">
                          <img
                            src={v.image_url}
                            alt=""
                          />
                        </div>
                      </div>
                      <div>
                        {v.name}
                      </div>
                    </Link>
                  )
                }
              </div>
            </div>
            <div className="products-list">

            <div className="breadcrumbs">
                    <h4>
                      <span onClick={() => { window.location.href = "/" }}>Trang chủ /  </span>
                     
                    Danh sách sản phẩm
                    </h4>
                  </div>

              <div className="sort-option row">
                <span>
                  Có {pageInfo.total} sản phẩm trong danh mục
                </span>
                <Select
                  placeholder="Sắp xếp"
                  handleSelect={handleSort}
                  showDetail={showNextElement}
                  values={[
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
                  ]}
                />
              </div>
              <div className="row">
                {
                  pageInfo.data.map((v, i) =>
                    <ProductCard
                      key={i}
                      product={v}
                    />
                  )
                }
              </div>
              <Paginate
                currentPage={pageInfo.current_page}
                totalPage={pageInfo.last_page}
                handlePageSelect={handleSort}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
      : <PageLoading />
  )
}
export default ProductsListPage