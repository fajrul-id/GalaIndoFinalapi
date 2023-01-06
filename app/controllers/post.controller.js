const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: post } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, totalPages, currentPage, post };
};

// CREATE: untuk enambahkan data kedalam tabel post
exports.create = (req, res) => {
  // validate request
  if (!req.body.title) {
    return res.status(400).send({
      message: "title can not be empty",
    });
  }

  // daya yang didapatkan dari inputan oleh pengguna
  const posts = {
    title: req.body.title,
    body: req.body.body,
    author: req.body.author,
    images: req.body.images,
    category: req.body.category,
    limit: req.params.limit,
    skip: req.params.skip,
  };

  // proses menyimpan kedalam database
  Post.create(posts)
    .then((data) => {
      res.json({
        message: "post created successfully.",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while creating the Post.",
        data: null,
      });
    });
};

exports.findAll = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  Post.findAndCountAll({ where: condition, limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving post.",
      });
    });
};

// READ: menampilkan atau mengambil semua data sesuai model dari database
// exports.findAll = (req, res) => {
//   Post.findAll({
//     limit: 2,
//     offset: 3,
//     where: {}, // conditions
//   })
//     .then((posts) => {
//       res.json({
//         message: "posts retrieved successfully.",
//         data: posts,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: err.message || "Some error occurred while retrieving posts.",
//         data: null,
//       });
//     });
// };

// UPDATE: Merubah data sesuai dengan id yang dikirimkan sebagai params
exports.update = (req, res) => {
  const id = req.params.id;
  Post.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "post updated successfully.",
          data: req.body,
        });
      } else {
        res.json({
          message: `Cannot update post with id=${id}. Maybe post was not found or req.body is empty!`,
          data: req.body,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while updating the Post.",
        data: null,
      });
    });
};

// DELETE: Menghapus data sesuai id yang dikirimkan
exports.delete = (req, res) => {
  const id = req.params.id;
  Post.destroy({
    where: { id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "post deleted successfully.",
          data: req.body,
        });
      } else {
        res.json({
          message: `Cannot delete post with id=${id}. Maybe post was not found!`,
          data: req.body,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while deleting the Post.",
        data: null,
      });
    });
};

// BONUS ===> Mengambil data sesuai id yang dikirimkan
exports.findOne = (req, res) => {
  Post.findByPk(req.params.id)
    .then((posts) => {
      res.json({
        message: "post retrieved successfully.",
        data: posts,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving Post.",
        data: null,
      });
    });
};
