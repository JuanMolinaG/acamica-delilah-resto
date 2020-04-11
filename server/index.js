const express = require( 'express' );
const bodyParser = require('body-parser');

const app = express();
app.use( bodyParser.json() );

app.get( '/users', ( request, response ) => {
    response.send( 'Hola desde Express' );
});

app.post( '/users', ( request, response ) => {
    response.send( request.body );
});

app.get( '/error', ( request, response ) => {
    response.status( 404 ).json({
        error: 'Endpoint not found'
    });
});

app.use(function(err, req, res, next) {
    if(!err) return next();
    console.log('Error, algo salio mal', err);
    res.status(500).send('Error');
});


app.listen( 3000, () => {
    console.log( 'Servidor iniciado' );
});