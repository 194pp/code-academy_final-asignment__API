const { Router } = require('express');
const router = Router();

const registerRoute = require('./registerRoute');
const loginRoute = require('./loginRoute');
const userRoute = require('./userRoute');

router.use('/register', registerRoute);
router.use('/login', loginRoute);
router.use('/users', userRoute)

router.get('/', (req, res) => {
  res.send('Express aplikacija');
});
router.all('*', (req, res) =>{
  res.status(404).send('Page not found')
});

module.exports = router;
