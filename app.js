const express = require("express");
const path = require("path");
const app = express();
const productRouter = require("./app/product/routes");
const productRouter2 = require("./app/product2/routes");
const logger = require("morgan");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1", productRouter);
app.use("/api/v2", productRouter2);
app.use((req, res, next) => {
  res.status(404);
  res.json({
    status: "failed",
    message: "Resource " + req.originalUrl + " not found",
  });
});
app.listen(3000, () => console.log(`server is running on http://localhost:3000`));
