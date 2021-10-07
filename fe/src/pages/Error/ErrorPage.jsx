import React from "react";
import { useSelector } from "react-redux";
import queryString from "query-string";
import Header from "../../components/Header";
import { constants as c } from "../../constants";
import { useEffect } from "react";
function ErrorPage(props) {
  let query = queryString.parse(props.location.search);
  const categoryStatus = useSelector((state) => state.category.status);
  useEffect(() => {
    if (Object.keys(query).length > 0) {
      document.title = query.message
    } else {
      document.title = "Trang không tồn tại"
    }
  })
  return (
    <React.Fragment>
      {
        categoryStatus === c.SUCCESS && <Header />
      }
      {Object.keys(query).length > 0 ?
        <div className="err-page">
          {query.code} <br />
          {query.message}
        </div>
        :
        <div className="err-page">
          404 <br />
          Trang không tồn tại
        </div>}
    </React.Fragment>
  )
}
export default ErrorPage