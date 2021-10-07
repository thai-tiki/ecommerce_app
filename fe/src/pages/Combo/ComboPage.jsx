import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { constants as c } from "../../constants";
import { comboActions } from "../../actions/comboActions";
import PageLoading from "../../components/PageLoading";
import Header from "../../components/Header";
import ComboCard from "./child/ComboCard";
import EmptyCombo from "../../components/Empty/EmptyCombo";
function ComboPage() {

  
  const dispatch = useDispatch();
  const status = useSelector(state => state.combo.status);
  const list = useSelector(state => state.combo.list);
  useEffect(() => {
    document.title = "Combo giảm giá";
    if (status === c.LOADING)
      dispatch(comboActions.getAllCombos());
  })
  return (
    <React.Fragment>
      <Header />
      {
        status !== c.LOADING ?
          (
            list.length == 0 ? <EmptyCombo /> :
            <div className="combo-page">
            <div className="container">
              <div className="list">
                {
                  list.map((v, i) => <ComboCard key={i}
                    name={v.name}
                    end={v.end_time}
                    set_limit_amount={v.set_limit_amount}
                    value={v.value_discount}
                    type={v.discount_type}
                    products={v.products_combo}
                  />)
                }
              </div>
            </div>
          </div>)
          : <PageLoading />
      }
    </React.Fragment>
  )
}
export { ComboPage }