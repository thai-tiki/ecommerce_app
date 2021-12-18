const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const helper = require("./helper");
const shipmentMethodRoute = require("./routes/shipmentMethod");
const paymentMethodRoute = require("./routes/paymentMethod");
const categoryRoute = require("./routes/category");
const voucherRoute = require("./routes/voucher");
const productRoute = require("./routes/product");
const bannerRoute = require("./routes/banner");
const orderRoute = require("./routes/order");
const adminRoute = require("./routes/admin");
const cartRoute = require("./routes/cart");
const userRoute = require("./routes/user");
const siteRoute = require("./routes/site");
const newsRoute = require("./routes/news");
const port = process.env.PORT || 3001;
const app = express();
//static file
app.use(express.static(path.join(__dirname, "/shared")));
//security http header
app.use(helmet());
//cors
app.use(cors());
//bodt parser
app.use(express.json());
helper.dbConnect();
app.listen(port, () => {
  console.log("server started");
});
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/news", newsRoute);
app.use("/api/order", orderRoute);
app.use("/api/admin", adminRoute);
app.use("/api/banner", bannerRoute);
app.use("/api/voucher", voucherRoute);
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/payment_method", paymentMethodRoute);
app.use("/api/shipment_method", shipmentMethodRoute);
app.use("/api/", siteRoute);
