const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/fields-validations');

const router = Router();

router.post('/login', [
    check('email','Email not valid').isEmail(),
    check('password','Must have a password').not().isEmpty(),
    validateFields
], login );

module.exports = router;