const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

   if (!req.body.title) {
       res.status(400).send({
           msg: "COntent can not be empty!"
       });
       return;
   }

   const tutorial = {
       title: req.body.title,
       description: req.body.description,
       published: req.body.published ? req.body.published : false
   };

   Tutorial.create(tutorial)
   .then(data => {
       res.send(data);
   })
   .catch(err => {
       res.status(500).send({
           msg:
           err.msg || "Some error occured while creating the Tutorial."
       });
   });
};

exports.findAll = (req, res) => {
   const title = req.query.title;
   const condition = title ? {
       tile: { [Op.like]: `%${title}%` }
   } : null;

   Tutorial.findAll({ where: condition })
   .then(data => {
       res.send(data);
   })
   .catch(err => {
       res.status(500).send({
           msg:
           err.msg || "Some error occured while retrieving tutorials."
       });
   });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Tutorial.findByPk(id)
  .then(data => {
      if (data) {
          res.send(data);
      } else {
          res.status(404).send({
              msg: `Cannot find Tutorial with id=${id}.`
          });
      }
  })
  .catch(err => {
      res.status(500).send({
          msg: "Error retrieving Tutorial with id=" + id
      });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Tutorial.update(req.body, {
      where: { id: id }
  })

  .then(num => {
      if (num == 1) {
          res.send({
              msg: "Tutorial was updated successfully!"
          });
      } else {
          res.send({ 
              msg: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
      }
  })

  .catch(err => {
      res.status(500).send({
          msg: "Error updating Tutorial with id=" + id
      });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Tutorial.destroy({
      where: { id: id }
  })
  .then(num => {
      if (num == 1) {
          res.send({
              msg: "Tutorial was deleted successfully!"
          });
      } else {
          res.send({
              msg: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
      }
  })

  .catch(err => {
    res.status(500).send({
        msg: "Could not delete Tutorial with id=" + id
    })
  })
};

exports.deleteAll = (req, res) => {
  Tutorial.destroy({
      where: {},
      truncate: false
  })

  .then(nums => {
      res.send({
          msg: `${nums} Tutorials were deleted successfully!`
      });
  })

  .catch(err => {
      res.status(500).send({
          msg: 
          err.message || "Some error occurred while removing all tutorials."
      });
  });
};

exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ 
      where: { published: true }
  })
  
  .then(data => {
      res.status(500).send({
          msg:
          err.message || "Some error occurred while retrieving tutorials."
      });
  });
};