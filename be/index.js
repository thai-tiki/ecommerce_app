const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const helper = require("./helper");
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");
const bannerRoute = require("./routes/banner");
const siteRoute = require("./routes/site");
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
app.listen(3000, () => {
  console.log("server started");
});
app.use("/api/banner", bannerRoute);
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/", siteRoute);
