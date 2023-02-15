const connection = require("../../config/mysql");
const path = require("path");
const fs = require("fs");

const getAllData = (req, res) => {
  const { search } = req.query;
  let exec = {};
  if (search) {
    exec = {
      sql: `SELECT * FROM products WHERE name LIKE ?`,
      values: [`%${search}%`],
    };
  } else {
    exec = {
      sql: `SELECT * FROM products`,
    };
  }
  connection.query(exec, _response(res));
};

const getAllDataById = (req, res) => {
  connection.query(
    {
      sql: "SELECT * FROM products WHERE id = ?",
      values: [req.params.id],
    },
    _response(res)
  );
};

const destroyData = (req, res) => {
  connection.query(
    {
      sql: "DELETE FROM products WHERE id = ?",
      values: [req.params.id],
    },
    _response(res)
  );
};

const dataStore = (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    connection.query(
      {
        sql: `INSERT INTO products (users_id, name, price, stock, status, image_url ) VALUES (?,?,?,?,?,?)`,
        values: [Number(users_id), name, price, stock, status, `http://localhost:3000/public/${image.originalname}`],
      },
      _response(res)
    );
  }
};

const updateData = (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  let sql = "";
  let values = [];
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    sql = `UPDATE products SET users_id = ?, name = ?, price = ?, stock = ?, status = ?, image_url = ? WHERE id=?`;
    values = [Number(users_id), name, price, stock, status, `http://localhost:3000/public/${image.originalname}`, req.params.id];
  } else {
    sql = `UPDATE products SET users_id = ?, name = ?, price = ?, stock = ?, status = ? WHERE id=?`;
    values = [Number(users_id), name, price, stock, status, req.params.id];
  }
  connection.query({ sql, values }, _response(res));
};

const _response = (res) => {
  return (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        status: "failed",
        response: err,
      });
    } else {
      res.send({
        status: "success",
        response: result,
      });
    }
  };
};

module.exports = {
  getAllData,
  getAllDataById,
  dataStore,
  updateData,
  destroyData,
};
