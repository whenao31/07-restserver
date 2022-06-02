const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const getUsers = async(req = request, res = response) => {

    // const { q, page, limit, name = 'no name'} = req.query;
    // res.json({
    //     msg: 'GET Endpoint from controllers',
    //     q,
    //     page,
    //     limit,
    //     name
    // })
    const { page, limit, from} = req.query;
    const query = { status: true };

    // const users = await User.find( query )
    //                     .skip(from)
    //                     .limit(limit);
    // const total = await User.countDocuments( query );

    // Promise.all() executes multiple promises at the same time
    const [ total, users ] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
            .skip(from)
            .limit(limit),
    ]);

    res.json({
        total,
        users,
    })
}

const putUsers = async(req = request, res = response) => {

    const {id} = req.params;
    const { _id, password, google, email, ...otherFields } = req.body;

    if ( password ) {
        // Password Encryption
        const salt = bcryptjs.genSaltSync();
        otherFields.password = bcryptjs.hashSync(password, salt);
    }

    // findByIdAndUpdate(id, update, options) -> options->new(boolean):true to receive the updated doc
    const user = await User.findByIdAndUpdate( id, otherFields, { new: true } );

    res.json({
        user
    })
}

const postUsers = async (req = request, res = response) => {

    const {name, email, password, role, } = req.body;

    const user = new User({name, email, password, role, status: true});

    // Password Encryption
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Save in DB
    await user.save();

    res.status(201).json({
        user
    })
}

const deleteUsers = async(req = request, res = response) => {

    const { id } = req.params;

    // const user = await User.findByIdAndDelete( id );
    const user = await User.findByIdAndUpdate( id, {status: false}, { new: true } );
    const authenticatedUser = req.user;

    res.json({
        user,
    });
}


module.exports = {
    getUsers,
    putUsers,
    postUsers,
    deleteUsers
}