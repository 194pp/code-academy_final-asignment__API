const { Router } = require('express');
const router = Router();
const { usersController } = require('../controllers');
const { authenticateToken } = require('../helpers/auth/jwtHelper');

// GET: /users
router.get('/', authenticateToken, usersController.getAll);
router.delete('/', authenticateToken, usersController.deleteOne);
router.put('/', authenticateToken, usersController.modifyOne);

module.exports = router;
