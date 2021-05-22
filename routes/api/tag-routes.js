const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({
      include: [{
        through:ProductTag,
        model: Product
      }]
    }
    );
    res.status(200).json(tags)
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        through:ProductTag,
        model: Product
      }]
    })
    res.status(200).json(tags)
  } catch (error) {
    res.status(400).json(error)
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const tags = await Tag.create(
      req.body
    )
    res.status(200).end()
  } catch (error) {
    res.status(400).json(error)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tags = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).end()
  } catch (error) {
    res.status(400).json(error)
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    const tags = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).end()
  } catch (error) {  
    res.status(400).json(error)
  }
});

module.exports = router;
