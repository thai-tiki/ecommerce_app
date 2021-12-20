module.exports = {
  DB_CONNECTION:
    "mongodb+srv://admin:admin@cluster0.coxjg.mongodb.net/ecommerce_app?retryWrites=true&w=majority",
  DB_CONNECTION1: "mongodb://localhost:27017/ecommerce_shop",
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
  CODE_500: "Có lỗi xảy ra vui lòng thử lại sau !",
  NO_TOKEN: "Vui lòng đăng nhập !",
  NO_ROLE: "Không đủ quyền truy cập",
  NO_USER: "Tài khoản không tồn tại",
  NO_PRODUCT: "Sản phẩm không tôn tại",
  NO_CART_ITEM: "Không tồn tại sản phẩm trong giỏ hàng",
  NO_VOUCHER: "Voucher không tồn tại hoặc đã hết hạn",
  NO_ORDER: "Đơn hàng không tồn tại",
  NO_ROLE: "Không có quyền sử dụng chức năng này!",
  NO_PAYMENT_METHOD: "Phương thức thanh toán không tồn tại",
  NO_SHIPMENT_METHOD: "Phương thức giao hàng không tồn tại",
  ALREADY_COMMENT: "Sản phẩm này đã được đánh giá trước đây",
  PRODUCT_NOT_IN_ORDER: "Sản phẩm không tồn tại trong đơn hàng",
  WRONG_PASSWORD: "Mật khẩu không chính xác",
  MISSING_INFO: "Vui lòng gửi đầy đủ thông tin",
  EMPTY_CART: "Không có sản phẩm trong giỏ hàng",
  PHONE_REGISTERED: "Số điện thoại đã được đăng ký",
  PHONE_NOT_REGISTERED: "Số điện thoại chưa đăng ký",
  LOGIN_MISSING_INFO: "Vui lòng cung cấp đầy đủ thông tin đăng nhập",
  VOUCHER_ORDER_TOTAL_ERROR: "Chưa đạt mức tối thiểu để áp dụng voucher",
  UPDATE_PRODUCT_SUCCESS: "Cập nhật thông tin sản phẩm thành công !",
  UPDATE_ORDER_SUCCCESS: "Cập nhật thông tin đơn hàng thành công !",
  //ROLE
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  //VOUCHER
  VALUE_DISCOUNT: "VALUE_DISCOUNT",
  PERCENT_DISCOUNT: "PERCENT_DISCOUNT",
  //HASH
  JWT_SECRET: "ahjwWIU12",
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
