const {Router} = require('express');
const router = Router();
const {utilsController} = require('../controllers');

// USE: /utils
router.get('/jwt-verify', utilsController.validateToken);

module.exports = router;
