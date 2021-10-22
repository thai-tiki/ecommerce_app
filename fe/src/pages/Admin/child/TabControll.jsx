export default function TabControll(props) {
  return (
    <div className="tab-controll">
      <h3>Quản lý cửa hàng</h3>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "calc(100% - 56px)" }}>
        <div className="column">
          <div className="tab-name">
            <img src="/img/checklist (1).png" alt="" />
            <span>Sản phẩm</span>
          </div>
          <div className="tab-name">
            <img src="/img/checklist.png" alt="" />
            <span>Danh mục sản phẩm</span>
          </div>
          <div className="tab-name">
            <img src="/img/voucher.png" alt="" />
            <span>Khuyến mãi</span>
          </div>
          <div className="tab-name">
            <img src="/img/checklist (2).png" alt="" />
            <span>Đơn hàng</span>
          </div>
          <div className="tab-name">
            <img src="/img/profits.png" alt="" />
            <span>Doanh thu</span>
          </div>
          <div className="tab-name">
            <img src="/img/shipment.png" alt="" />
            <span>Phí vận chuyển</span>
          </div>
          <div className="tab-name">
            <img src="/img/post.png" alt="" />
            <span>Nhân viên</span>
          </div>
          <div className="tab-name">
            <img src="/img/mobile-payment.png" alt="" />
            <span>Phương thức thanh toán</span>
          </div>
        </div>
        <div className="backhome tab-name">
          <img src="/img/arrow.png" alt="" />
          <span>Về trang chủ</span>
        </div>
      </div>
    </div>
  )
}