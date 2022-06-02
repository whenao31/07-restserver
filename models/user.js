
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Must have a name']
    },
    email: {
        type: String,
        required: [true, 'Must have an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Must have a password']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        // enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: false
    },
    google: {
        type: Boolean,
        default: false
    },
});

// Overrriding method 'toJSON' in order to take off fields of the Model
UserSchema.methods.toJSON = function() {
    // de-structuring the model letting out '__v' and 'password'
    const { __v, password, ...user } = this.toObject();
    return user;
}

module.exports = model('Users', UserSchema);