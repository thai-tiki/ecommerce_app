export default function Overview(props) {
  return (
    <div className="overview">
      <div className="info">
        <div>
          <span>Sản phẩm</span>
          <p style={{ color: "#3CAF87" }}>{props.info.products}</p>
        </div>
        <div>
          <div
            className="circle"
            style={{ background: "#c0e5e4" }}
          >
            <img src="/img/package.png" alt="" />
          </div>
          <div className="flag">
            <div style={{ background: "#c0e5e4" }}></div>
            <img src="/img/penrose-square (1).png" alt="" />
          </div>
        </div>
      </div>
      <div className="info">
        <div>
          <span>Đơn hàng</span>
          <p style={{ color: "#E8DC8E" }}>0{props.info.orders}</p>
        </div>
        <div>
          <div
            className="circle"
            style={{ background: "#e6edb7" }}
          >
            <img src="/img/order.png" alt="" />
          </div>
          <div className="flag">
            <div style={{ background: "#e6edb7" }}></div>
            <img src="/img/penrose-square (1).png" alt="" />
          </div>
        </div>
      </div>
      <div className="info">
        <div>
          <span>Khuyến mãi</span>
          <p style={{ color: "#DCC284" }}>0{props.info.vouchers}</p>
        </div>
        <div>
          <div
            className="circle"
            style={{ background: "#fce0a2" }}
          >
            <img src="/img/discount.png" alt="" />
          </div>
          <div className="flag">
            <div style={{ background: "#fce0a2" }}></div>
            <img src="/img/penrose-square (1).png" alt="" />

          </div>
        </div>
      </div>
      <div className="info">
        <div>
          <span>Doanh thu</span>
          <p style={{ color: "#939bab" }}>
            {(props.info.income / 1000000).toFixed(2)}
            <label style={{ fontSize: "20px" }}>Tr</label>
          </p>
        </div>
        <div>
          <div
            className="circle"
            style={{ background: "#cee1f4" }}
          >
            <img
              style={{ width: "30px" }}
              src="/img/dollar.png" alt="" />
          </div>
          <div className="flag">
            <div style={{ background: "#cee1f4" }}></div>
            <img src="/img/penrose-square (1).png" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}