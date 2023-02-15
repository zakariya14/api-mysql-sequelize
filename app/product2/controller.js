// const connection = require("../../config/sequelize");
const Product = require("./model");
const path = require("path");
const fs = require("fs");

const getAllData = async (req, res) => {
  const { search } = req.query;
  if (search) {
    try {
      await Product.sync();
      const result = await Product.findAll({
        where: {
          [Op.like]: `%${search}%`,
        },
      });
      console.log(search);
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  } else {
    try {
      await Product.sync();
      const result = await Product.findAll();
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  }
};

const getAllDataByID = async (req, res) => {
  let id = req.params.id;
  try {
    await Product.sync();
    const result = await Product.findByPk(id);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

const postData = async (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
  }
  try {
    await Product.sync();
    const result = await Product.create({
      users_id,
      name,
      price,
      stock,
      status,
      image_url: `http://localhost:3000/public/${image.originalname}`,
    });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getAllData,
  getAllDataByID,
  postData,
};
