const express           = require('express');
const server            = express();
const multipart         = require('connect-multiparty');
const uploadMiddleware  = multipart({ uploadDir: './assets/images' });
const cors              = require('cors');
const bodyParser        = require('body-parser');
const gm                = require('gm');



exports.init = ()=>{

    // USE = for middlewares
    server.use(cors());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true}));

    // define post route for /upload
    server.post('/upload', uploadMiddleware, (req,res)=> {

        var file = req.files.file;
        var imageSize = req.body.imageSize;
        
        // string razrezal na toliko kosov kot je / noter
        // ['assets', 'images', 'tra546373ndadn53_.jpg']
        // s split method vrednosti arrayu razdelimo na posamezne vrednosti, glede na znak, ki ga dolocimo

        var fileNameParts = file.path.split('/');

        // da vzamemo zadnji string ven
        var uniqueFilename = fileNameParts[fileNameParts.length-1];

        // kje se nas file najaha
        var path = file.path;
        var conversionPath = './assets/conversions/'+uniqueFilename;

        gm(path)
            .resize(imageSize.width, imageSize.height)
            .autoOrient()
            .negative()
                // path kam naj zapise convert image
            .write(conversionPath, function (err) {
                if (!err) {

                    console.log(' hooray! ');
                    res.send ({
                        conversionPath: '/assets/conversions/'+uniqueFilename,
                        imagePath:      '/assets/images/'+uniqueFilename

                    });

                } else {

                    console.log(err);
                    res.sendStatus(400);
                }

            });

    });


    server.listen(3000, ()=>{

        console.log('Server started')

    });
};