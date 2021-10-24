import { useEffect, useRef } from "react";
import { hideParentElement } from "../helper";
export default function Select(props) {
  const { placeholder, values, showDetail } = props;
  const myButton = useRef(null);
  const myContainer = useRef(null);
  function handleShowDetail(e) {
    if (values.length > 0)
      showDetail(e)
  }
  function handleSelect(e, v) {
    props.handleSelect(v);
    hideParentElement(e);
  }
  useEffect(() => {
    window.addEventListener('click', function (e) {
      let containers = document.querySelectorAll(".custom-select");
      for (let i = 0; i < containers.length; i++)
        if (containers[i].contains(e.target))
          return;
      if (myContainer.current && myContainer.current.offsetHeight > 16)
        myButton.current.click();
    });
  })
  return (
    <div className="custom-select">
      <div className="select-btn" onClick={handleShowDetail} ref={myButton}>
        <div>
          {placeholder}
        </div>
        <i className="fas fa-caret-down"></i>
      </div>
      <div className="options" ref={myContainer}>
        {
          values.map((v, i) => <div onClick={(e) => handleSelect(e, v)} key={i}>{v.title}</div>)
        }
      </div>
    </div>
  )
}