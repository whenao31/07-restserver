const { response } = require('express');
const { request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'Token not sent on the request'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        // Get authenticated user with uid from the DB
        const user = await User.findById(uid);
        if(!user) {
            return res.status(401).json({
                msg: 'Not valid token - user does not exists'
            });
        }

        // Verify authenticated user has its 'status' as 'true'
        if (!user.status) {
            return res.status(401).json({
                msg: 'Not valid token - status: false user'
            });
        }
        
        req.user = user;
        req.uid = uid;
        
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({
            msg: 'Not a valid token',
        });
    }
}

module.exports = {
    validateJWT
}