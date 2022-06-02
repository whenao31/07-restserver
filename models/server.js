const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;

        this.usersURI = '/api/users';
        this.authPath = '/api/auth';

        // Connect DB
        this.connectDB();

        // Middlewares
        this.middlewares();
        
        // App Routes
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Body read and parse
        this.app.use( express.json() );

        // Public folder for static content
        this.app.use( express.static('public'));
    }

    routes() {
        // Middleware to handle the routes
        this.app.use(this.authPath, require('../routes/auth') );
        this.app.use(this.usersURI, require('../routes/users') );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening at http://localhost:${this.port}`);
        });
    }

}


module.exports = Server;