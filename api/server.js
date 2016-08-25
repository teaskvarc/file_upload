const express           = require('express');
const server            = express();
const multipart         = require('connect-multiparty');
const uploadMiddleware  =  multipart({ uploadDir: './assets/images'});
const cors              = require('cors');
const bodyParser        = require('body-parser');
const gm                = require('gm');


exports.server = server;

exports.init = ()=>{

    // USE = for middlewares
    server.use(cors());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true}));

    // define post route for /upload
    server.post('/upload', uploadMiddleware, (req,res)=>{

        const file = req.files.file;

        // string razrezal na toliko kosov kot je / noter
        // ['assets', 'images', 'tra546373ndadn53_.jpg']
        // s split method vrednosti arrayu razdelimo na posamezne vrednosti, glede na znak, ki ga dolocimo

        const fileNameParts = file.path.split('/');

        // da vzamemo zadnji string ven
        const uniqueFilename = fileNameParts[fileNameParts.length-1];

        // kje se nas file najaha
        const path = file.path;
        const thumbPath = './assets/images/thumbs/'+ uniqueFilename;

        gm(path)
            .resize(353, 257)
            .autoOrient()
                // path kam naj zapise convert image
            .write(thumbPath, function (err) {
                if (!err) {

                    console.log(' hooray! ');
                    res.sendStatus(200);

                } else {

                    res.sendStatus(400);
                }

            });

    });


    server.listen(3000, ()=>{

        console.log('Server started')

    });
};