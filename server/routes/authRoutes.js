const express = require('express');
const router = express.Router();
const { authUser, registerUser } = require('../controllers/authController');
const { validateUser } = require('../middleware/validationMiddleware');

router.post('/login', validateUser, authUser);
router.post('/register', validateUser, registerUser);

module.exports = router;