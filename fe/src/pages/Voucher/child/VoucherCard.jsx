import { formatPrice } from "../../../helper";
import Slider from "react-slick";
import { constants as c } from "../../../constants";
import ProductVoucher from "./ProductVoucher";
export default function VoucherCard(props) {
  var settings = {
    infinite: props.products.length > 4,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          infinite: props.products.length > 2,
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          infinite: props.products.length > 4,
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992,
        settings: {
          infinite: props.products.length > 5,
          slidesToShow: 5,
          slidesToScroll: 1,
        }
      },
    ]
  };
  return (
    <div className="voucher-card">
      <div className="top row">
        <button className="info-btn">
          Voucher
        </button>
        <div className="name">
          <div>
            {props.name}
          </div>
        </div>
        <div className="info">
          <div>
            <div className="value">
              Giảm {
                props.type === c.PERCENT_DISCOUNT
                  ? props.value + "%"
                  : "₫" + formatPrice(props.value)}
            </div>
            <div className="code">
              <span>Mã: </span> {props.code}
            </div>
            {
              props.min_order_value > 0 &&
              <div className="apply">
                Cho đơn hàng từ {formatPrice(props.min_order_value)}
              </div>
            }
          </div>
          <div className="end">
            <span>HSD: </span> {props.end}
          </div>
        </div>
      </div>
      {
        props.voucher_type === 1 && props.set_limit_total && <h4>Áp dụng khi mua các sản phẩm sau</h4>
      }
      {
        props.voucher_type === 1 && !props.set_limit_total && <h4>Áp dụng khi mua các sản phẩm sau</h4>
      }
      {
        props.voucher_type === 1 &&
        <div className="products">
          <Slider {...settings}>
            {
              props.products.map((v, i) =>
                <div className="card-wraper" key={i}>
                  <ProductVoucher
                    product={v}
                  />
                </div>
              )
            }
          </Slider>
        </div>
      }
    </div>
  )
}