const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { genJWT } = require('../helpers/generate-jwt');

const login = async(req = request, res = response) => {
    
    const { email, password } = req.body;
    
    try {

        // Validate exists user email
        const user = await User.findOne( { email } );
        if (!user) {
            return res.status(400).json({
                msg: 'Either user or password is incorrect. - email'
            });
        }

        // validate user status
        if (!user.status) {
            return res.status(400).json({
                msg: 'Either user or password is incorrect. - status is false'
            });
        }
        
        // Validate password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Either user or password is incorrect. - password'
            });
        }

        // Generate JWT
        const token = await genJWT( user.id ); 

        res.json({
            user,
            token
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Please contact tech support.'
        });
    }


}


module.exports = {
    login
}