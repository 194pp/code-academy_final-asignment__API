const {Router} = require('express');
const router = Router();
const {usersController} = require('../controllers');
const {authenticateToken} = require('../helpers/auth/jwtHelper');

// USE: /users
router.get('/', authenticateToken, usersController.getAll);
router.get('/:_id', authenticateToken, usersController.getOne);
router.delete('/', authenticateToken, usersController.deleteOne);
router.put('/', authenticateToken, usersController.modifyOne);

module.exports = router;
