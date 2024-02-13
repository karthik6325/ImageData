const { postImage, getImagesForUser } = require('../controllers/userData');
const { register, login } = require('../controllers/authentication');
const authenticateToken = require('../middleware/jwtauthorization');

const router = require('express').Router();

router.post('/postImage', authenticateToken, postImage)
.get('/getimages', authenticateToken, getImagesForUser)
.post('/register', register)
.post('/login', login)

module.exports = router;
