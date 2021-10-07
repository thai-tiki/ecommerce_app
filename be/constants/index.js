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
  PHONE_REGISTERED: "Số điện thoại đã được đăng ký",
  PHONE_NOT_REGISTERED: "Số điện thoại chưa đăng ký",
  LOGIN_MISSING_INFO: "Vui lòng cung cấp đầy đủ thông tin đăng nhập",
  //ROLE
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  //HASH
  JWT_SECRET: "12KDJAKE21",
  SALT_SECRET: "$2a$12$t7M3OgpA4ML85VAwnlI10.",
};
