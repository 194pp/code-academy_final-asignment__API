const {Router} = require('express');
const router = Router();
const {loginController} = require('../controllers');

// USE: /login
router.post('/', loginController.loginUser);

module.exports = router;
