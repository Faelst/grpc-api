const { Router } = require('express');
const router = Router();

const UserController = require('./controllers/User');
const SessionController = require('./controllers/Session');
const PurchaseController = require('./controllers/purchase');

router.get('/', (req, res) => {
  res.send('Hello World');
});

router.get('/user/:id', UserController.show);
router.post('/users', UserController.store);
// router.get('/users/:id/purchases', UserController.purchases);

router.post('/session', SessionController.store);

router.get('/purchase/:id', PurchaseController.show);
router.get('/purchases', PurchaseController.index);
router.post('/purchase', PurchaseController.store);

module.exports = router;
