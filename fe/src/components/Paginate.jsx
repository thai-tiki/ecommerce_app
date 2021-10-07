import React from "react";
import { useSelector } from "react-redux";
export default function Paginate(props) {
  const appTheme = useSelector(state => state.app.appTheme);
  const { handlePageSelect, currentPage, totalPage } = props;
  const left = currentPage >= 3 && [
    <button onClick={() => handlePageSelect({ page: 1 })} key="left-01">
      1
    </button>,
    currentPage >= 4 &&
    <button style={{ border: "none", color: "#757575" }} key="left-02">
      <i className="fas fa-ellipsis-h"></i>
    </button>
  ];
  const middle = [
    currentPage - 1 > 0 &&
    <button onClick={() => handlePageSelect({ page: currentPage - 1 })} key="middle-01">
      {currentPage - 1}
    </button>,
    <button className="active" key="middle-02" style={{ background: appTheme.color_main_1, color: "white" }}>
      {currentPage}
    </button>,
    currentPage + 1 <= totalPage &&
    <button onClick={() => handlePageSelect({ page: currentPage + 1 })} key="middle-03">
      {currentPage + 1}
    </button>
  ];
  const right = totalPage - currentPage >= 2 && [
    totalPage >= 4 &&
    <button style={{ border: "none", color: "#757575" }} key="right-01">
      <i className="fas fa-ellipsis-h"></i>
    </button>,
    <button onClick={() => handlePageSelect({ page: totalPage })} key="right-02">
      {totalPage}
    </button>
  ];
  return (
    totalPage === 1 ? <div></div> :
      <React.Fragment>
        <div className="desktop-paginate">
          {
            currentPage > 1 ?
              <button className="pre-btn" onClick={() => handlePageSelect({ page: currentPage - 1 })}>
                <i className="fas fa-chevron-left"></i>
              </button>
              :
              <button className="pre-btn disable">
                <i className="fas fa-chevron-left"></i>
              </button>
          }
          {left} {middle} {right}
          {
            currentPage + 1 <= totalPage ?
              <button className="next-btn" onClick={() => handlePageSelect({ page: currentPage + 1 })}>
                <i className="fas fa-chevron-right"></i>
              </button>
              :
              <button className="next-btn disable">
                <i className="fas fa-chevron-right"></i>
              </button>
          }
        </div>
        <div className="mobile-paginate">
          {
            currentPage > 1
              ?
              <button className="pre-btn">
                <i className="fas fa-chevron-left" onClick={() => handlePageSelect({ page: currentPage - 1 })}></i>
              </button>
              : <button className="pre-btn disable">
                <i className="fas fa-chevron-left"></i>
              </button>
          }
          <div> <span>{currentPage}</span>/{totalPage}</div>
          {
            currentPage + 1 <= totalPage ?
              <button className="pre-btn" onClick={() => handlePageSelect({ page: currentPage + 1 })}>
                <i className="fas fa-chevron-right"></i>
              </button>
              :
              <button className="next-btn disable">
                <i className="fas fa-chevron-right"></i>
              </button>
          }
        </div>
      </React.Fragment>
  )
}