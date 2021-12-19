const {Router} = require('express');
const router = Router();
const registerRoute = require('./registerRoute');
const loginRoute = require('./loginRoute');
const userRoute = require('./userRoute');
const {errorResp} = require("../helpers/response/response");

router.use('/register', registerRoute);
router.use('/login', loginRoute);
router.use('/users', userRoute)

router.get('/', (req, res) => {
  res.send('Express aplikacija');
});
router.all('*', (req, res) =>{
  res.status(404).send(errorResp('Puslapis neegzistuoja'));
});

module.exports = router;
