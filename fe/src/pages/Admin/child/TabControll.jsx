import { Link } from "react-router-dom";
export default function TabControll(props) {
  const listTab = [
    {
      name: "product",
      title: "Sản phẩm",
      img: "/img/checklist (1).png"
    },
    {
      name: "voucher",
      title: "Khuyến mãi",
      img: "/img/voucher.png"
    },
    {
      name: "category",
      title: "Danh mục sản phẩm",
      img: "/img/checklist.png"
    },
    {
      name: "order",
      title: "Đơn hàng",
      img: "/img/checklist (2).png"
    },
    {
      name: "news",
      title: "Bài viết",
      img: "/img/blog.png"
    },
    {
      name: "profit",
      title: "Doanh thu",
      img: "/img/profits.png"
    },
    {
      name: "shipment",
      title: "Phí vận chuyển",
      img: "/img/shipment.png"
    },
    {
      name: "user",
      title: "Nhân viên",
      img: "/img/post.png"
    },
    {
      name: "payment",
      title: "Phương thức thanh toán",
      img: "/img/mobile-payment.png"
    },
  ]
  return (
    <div className="tab-controll">
      <h3>Quản lý cửa hàng</h3>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "calc(100% - 56px)" }}>
        <div className="column">
          {
            listTab.map((v, i) =>
              <div
                key={i}
                onClick={() => props.onChange(v.name)}
                className={
                  "tab-name"
                  + " " +
                  (
                    props.current === v.name
                      ? "active"
                      : ""
                  )
                }
              >
                <img src={v.img} alt="" />
                <span>{v.title}</span>
              </div>
            )
          }
        </div>
        <Link to="/" className="backhome tab-name">
          <img src="/img/arrow.png" alt="" />
          <span>Về trang chủ</span>
        </Link>
      </div>
    </div>
  )
}