

const User = require('../models/user');
const Role = require('../models/role');

const isRoleValid = async(role = '') => {
    const existsRole = await Role.findOne({ role });
    if ( !existsRole ) {
        throw new Error(`Role ${role} is not registered in the DB`);
    }
}

// Validate whether the email already exists
const existsEmail = async(email = '') => {

    const existingEmail = await User.findOne( { email } );
    if ( existingEmail ) {
        throw new Error( `The email ${email} already exists in the DB`);
    }
}

// Validate whether a user id already exists
const existsUserById = async(id = '') => {

    const existingUser = await User.findById( id );
    if ( !existingUser ) {
        throw new Error( `The user with id ${id} does not exist in the DB`);
    }
}

module.exports = {
    isRoleValid,
    existsEmail,
    existsUserById
}