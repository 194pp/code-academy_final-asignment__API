const { Router } = require('express');
const router = Router();

const registerRoute = require('./registerRoute');
const loginRoute = require('./loginRoute');

router.use('/register', registerRoute);
router.use('/login', loginRoute);

router.get('/', (req, res) => {
  res.send('Express aplikacija');
});
router.all('*', (req, res) =>{
  res.status(404).send('Page not found')
});

module.exports = router;
