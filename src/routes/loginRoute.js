const { Router } = require('express');
const router = Router();
const { loginController } = require('../controllers')

router.post('/', loginController.loginUser);

module.exports = router;
