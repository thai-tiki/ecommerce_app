import React from "react";
export default function Filter(props) {
  function handdleTransitionEnd(e) {
    if (e.target.width === 0) {
      props.closeFilter();
    }
  }
  return (
    <React.Fragment>
      <div className="filter">
        {
          props.info.title.map((t, i) =>
            <div className="filter-type" key={i}>
              <div className="title">
                {t}
              </div>
              <div className="values">
                {
                  props.info.value[i].map((v, j) =>
                    <div className="row" key={j}>
                      <input type="checkbox" name="1" id={t + v} />
                      <label htmlFor={t + v}>{v}</label>
                    </div>
                  )
                }
              </div>
            </div>
          )
        }
      </div>
      <div className="mobile">
        <div className={"modal " + props.style}>
          <div className={"mobile-filter " + props.style} onTransitionEnd={handdleTransitionEnd}>
            <div>
              {
                props.info.title.map((t, i) =>
                  <div className="filter-type" key={i}>
                    <div className="title">{t}</div>
                    <div className="values row">
                      {
                        props.info.value[i].map((v, j) =>
                          <button key={j}>{v}</button>
                        )
                      }
                    </div>
                  </div>
                )
              }
            </div>
            <div className="action">
              <button className="cancel-btn" onClick={props.onCancel}>HỦY</button>
              <button className="confirm-btn" onClick={props.onConfirm}>XÁC NHẬN</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}