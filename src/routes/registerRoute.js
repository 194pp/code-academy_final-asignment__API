const {Router} = require('express');
const router = Router();
const {registerController} = require('../controllers');

// USE: /register
router.post('/', registerController.registerNewUser);

module.exports = router;
