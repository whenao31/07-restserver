const { Router } = require('express');
const { check } = require('express-validator');

const {
    getUsers,
    putUsers,
    postUsers,
    deleteUsers
} = require('../controllers/users');

const { isRoleValid, existsEmail, existsUserById } = require('../helpers/db-validators');

const {
    validateFields,
    validateJWT,
    isAdminRole,
    hasRole
} = require('../middlewares');

const router = Router();

// GET request
router.get('/', getUsers);

// PUT request
router.put('/:id', [
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom( existsUserById ),
    check('role').custom( isRoleValid ),
    validateFields
], putUsers);

// POST request. 
router.post('/', [
    check('name','Must have a name').not().isEmpty(),
    check('password','minimum length of password is 6 characters').isLength({min:6}),
    check('email','Email not valid').isEmail(),
    // check('role', 'Not a valid Role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isRoleValid ),
    check('email').custom( existsEmail),
    validateFields
], postUsers);

// DELETE request
router.delete('/:id',[
    validateJWT,
    // isAdminRole,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom( existsUserById ),
    validateFields
], deleteUsers);



module.exports = router;