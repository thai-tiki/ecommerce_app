import React, { useState } from "react";
import CommentTab from "./CommentTab";
export default function DetailInfo(props) {
  const { description, attributes } = props;
  const [currentTab, setCurrentTab] = useState("description");
  return (
    <div className="detail-info">
      <div className="detail">
        <h3>Thông tin chi tiết</h3>
        {
          attributes.map((v, i) =>
            <div className="row" key={i}>
              <div className="title">
                {v.name}
              </div>
              <div className="info">
                {v.value}
              </div>
            </div>
          )
        }
      </div>
      <div className="tabs">
        <React.Fragment>
          <div className="row">
            <h3
              onClick={() => setCurrentTab("description")}
              className={currentTab === "description" ? "active" : ""}>
              Mô tả sản phẩm
            </h3>
            <h3
              onClick={() => setCurrentTab("comment")}
              className={currentTab === "comment" ? "active" : ""}
            >
              Đánh giá
            </h3>
          </div>
          {
            currentTab === "description" ?
              <React.Fragment>
                {
                  description ?
                    <div className="description"
                      style={{ paddingLeft: "1em" }}
                      dangerouslySetInnerHTML={{ __html: description }}>
                    </div>
                    :
                    <div className="description">
                      <div style={{ textAlign: "center", fontSize: "18px", color: "#757575" }}>
                        Sản phẩm chưa có mô tả từ nhà cung cấp
                      </div>
                    </div>
                }
              </React.Fragment>
              :
              <CommentTab />
          }
        </React.Fragment>
      </div>
    </div>
  )
}