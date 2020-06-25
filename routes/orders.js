const router = require('express').Router();

const OrderController = require('../controllers/OrderController');

router.post('/', OrderController.create);
router.get('/', OrderController.getAllOrders)
router.get('/:id', OrderController.getOneOrder)
router.put('/:id', OrderController.update)
router.delete('/:id',OrderController.delete)

module.exports = router;