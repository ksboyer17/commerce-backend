const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{
        model: Product
      
      }]
    }
    );
    res.status(200).json(categories)
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/:id', async(req, res) => {
  try {
    const categories = await Category.findOne({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(categories)
  } catch (error) {
    res.status(400).json(error)
  }
 
});

router.post('/', async(req, res) => {
  try {
    const categories = await Category.create(
      req.body
    )
    res.status(200).end()
  } catch (error) {
    res.status(400).json(error)
  }
});

router.put('/:id', async(req, res) => {
  try {
    const categories = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    }
    )
    res.status(200).json(categories)
  } catch (error) {
    res.status(400).json(error)
  }

  // update a category by its `id` value
});

router.delete('/:id', async(req, res) => {
  try {
    const categories = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).end()
  } catch (error) {  
    res.status(400).json(error)
  }
  // delete a category by its `id` value
});

module.exports = router;
