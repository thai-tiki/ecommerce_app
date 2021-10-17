module.exports = {
  DB_CONNECTION: "mongodb://localhost:27017/ecommerce_shop",
  //PRODUCT
  IN_STOCK: "IN_STOCK",
  OUT_OF_STOCK: "OUT_OF_STOCK",
  STOP_SELLING: "STOP_SELLING",
  //STATUS
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  UNAUTHORIZED: "UNAUTHORIZED",
  //MESSAGE
  CODE_401: "Không tìm thấy !",
  WRONG_PASSWORD: "Mật khẩu không chính xác",
  CODE_500: "Có lỗi xảy ra vui lòng thử lại sau !",
  NO_TOKEN: "Vui lòng đăng nhập !",
  NO_ROLE: "Không đủ quyền truy cập",
  NO_USER: "Tài khoản không tồn tại",
  NO_PRODUCT: "Sản phẩm không tôn tại",
  NO_CART_ITEM: "Không tồn tại sản phẩm trong giỏ hàng",
  NO_VOUCHER: "Voucher không tồn tại hoặc đã hết hạn",
  NO_ORDER: "Đơn hàng không tồn tại",
  NO_PAYMENT_METHOD: "Phương thức thanh toán không tồn tại",
  NO_SHIPMENT_METHOD: "Phương thức giao hàng không tồn tại",
  MISSING_INFO: "Vui lòng gửi đầy đủ thông tin",
  EMPTY_CART: "Không có sản phẩm trong giỏ hàng",
  PHONE_REGISTERED: "Số điện thoại đã được đăng ký",
  PHONE_NOT_REGISTERED: "Số điện thoại chưa đăng ký",
  LOGIN_MISSING_INFO: "Vui lòng cung cấp đầy đủ thông tin đăng nhập",
  VOUCHER_ORDER_TOTAL_ERROR: "Chưa đạt mức tối thiểu để áp dụng voucher",
  //ROLE
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  //VOUCHER
  VALUE_DISCOUNT: "VALUE_DISCOUNT",
  PERCENT_DISCOUNT: "PERCENT_DISCOUNT",
  //HASH
  JWT_SECRET: "12KDJAKE21",
  SALT_SECRET: "$2a$12$t7M3OgpA4ML85VAwnlI10.",
  //ORDER STATUS
  WAITING_FOR_PROGRESSING: "WAITING_FOR_PROGRESSING",
  SHOP_CANCELED: "SHOP_CANCELED",
  CUSTOMER_CANCELED: "CUSTOMER_CANCELED",
  COMPLETED: "COMPLETED",
  //CART
  //APP
  PER_PAGE: 20,
};
