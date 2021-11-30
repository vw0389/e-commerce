const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id",]
      }
    ]
  }).then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'No tags found' });
      return;
    }
    res.json(tagData);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// find all tags
// be sure to include its associated Product data


router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id",]
      }
    ]
  }).then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that ID' });
      return;
    }
    res.json(tagData);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  // {
  //   tag_name: "tagy mctags"
  // }
  Tag.create(req.body)
    .then(tag => res.json(tag))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  // {
  //   tag_name: "tagy mctags"
  // }
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(tag => {
      if (!tag) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(tag);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that ID' });
      return;
    }
    res.json(tagData);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
