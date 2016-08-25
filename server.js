const express           = require('express');
const server            = express();
const multipart         = require('connect-multiparty');
const uploadMiddleware  =  multipart({ uploadDir: './assets/images'});
const cors              = require('cors');
const bodyParser        = require('body-parser');


exports.server = server;

exports.init = ()=>{

    // USE = for middlewares
    server.use(cors());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true}));

    // define post route for /upload
    server.post('/upload', uploadMiddleware, (req,res)=>{


    });


    server.listen(3000, ()=>{

        console.log('Server started')

    });
};