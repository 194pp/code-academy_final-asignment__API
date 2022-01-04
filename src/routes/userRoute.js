const {Router} = require('express');
const router = Router();
const {usersController} = require('../controllers');
const {authenticateToken} = require('../helpers/auth/jwtHelper');

router.use(authenticateToken);

// USE: /users
router.get('/', usersController.getAll);
router.get('/:_id', usersController.getOne);
router.delete('/', usersController.deleteOne);
router.put('/', usersController.modifyOne);

module.exports = router;
