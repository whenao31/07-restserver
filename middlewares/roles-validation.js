const { response } = require("express");
const { request } = require("express");


const isAdminRole = (req= request, res= response, next) => {

    if(!req.user){
        return res.status(500).json({
            msg: 'You are trying to validate the role avoiding the token validation'
        });
    }
    
    const { role, name } = req.user;
    
    if( role !== 'ADMIN_ROLE'){
        return res.status(500).json({
            msg: `${ name } has no ADMIN role.`
        });
    }

}

// This function demonstrate the way to receive arguments into a middleware
const hasRole = ( ...roles ) => {
    // now I can deal with the typical 'req', 'res' and 'next' parameters of a middleware
    return ( req = request, res = response, next ) => {
        
        if(!req.user){
            return res.status(500).json({
                msg: 'You are trying to validate the role avoiding the token validation'
            });
        }

        if( !roles.includes( req.user.role ) ) {
            return res.status(401).json({
                msg: `This service requires one of these roles: ${ roles }`,
            });
        }

        next();
    }
}

module.exports = {
    isAdminRole,
    hasRole
}