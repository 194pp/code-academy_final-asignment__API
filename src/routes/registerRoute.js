const { Router } = require('express');
const router = Router();
const { registerController } = require('../controllers')

router.post('/', registerController.registerNewUser);

module.exports = router;
