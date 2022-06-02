

const fieldsValidations = require('../middlewares/fields-validations');
const jwtValidation = require('../middlewares/jwt-validation');
const rolesValidation = require('../middlewares/roles-validation');

module.exports = {
    ...fieldsValidations,
    ...jwtValidation,
    ...rolesValidation,
}