const { Router } = require('express');
const router = Router();

const UserController = require('./controllers/user');
const SessionController = require('./controllers/session');

router.get('/', (req, res) => {
  res.send('Hello World');
});

router.get('/user/:id', UserController.show);
router.post('/users', UserController.store);
router.post('/session', SessionController.store);

module.exports = router;
