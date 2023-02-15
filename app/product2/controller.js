// const connection = require("../../config/sequelize");
const Product = require("./model");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");

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

const destroyData = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (product) {
      await product.destroy();
      return res.status(200).json({
        message: `Produk dengan id ${id} berhasil dihapus`,
      });
    }

    return res.status(404).json({
      message: `Produk dengan id ${id} tidak ditemukan`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Terjadi kesalahan pada server: ${error.message}`,
    });
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

const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const product = await Product.findByPk(id);

    if (product) {
      await product.update({
        name: name,
        price: price,
      });
      return res.status(200).json({
        message: `Produk dengan id ${id} berhasil diupdate`,
        product: product,
      });
    }
    return res.status(404).json({
      message: `Produk dengan id ${id} tidak ditemukan`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Terjadi kesalahan pada server: ${error.message}`,
    });
  }
};

module.exports = {
  getAllData,
  getAllDataByID,
  postData,
  updateData,
  destroyData,
};
