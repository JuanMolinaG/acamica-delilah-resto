const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const Token = require( './helpers/jwtGenerator' );

const userToken = new Token();

const app = express();
app.use( bodyParser.json() );

app.get( '/v1/users', ( req, res ) => {
    res.send( 'Hola desde Express' );
});

app.post( '/v1/users', ( req, res ) => {
    res.send( req.body );
});

app.post( '/v1/login', ( req, res ) => {
    const { username, password } = req.body;
    if ( username && password ) {
        res.json({
            token: userToken.generateToken( username )
        });
    } else {
        res.status( 400 ).json({
            error: 'Username and password are required'
        });
    }
});

const authenticateUser = ( req, res, next ) => {
    const receivedToken = req.headers.authorization.split(' ')[1];
    if ( receivedToken ) {
        try {
            const verifiedToken = userToken.verifyToken( receivedToken );
    
            if ( verifiedToken ) {
                req.user = verifiedToken;
                return next();
            }
        } catch (error) {
            res.status( 401 ).json({
                error: 'Invalid token'
            });
        }
    } else {
        res.status( 401 )
            .set( 'WWW-Authenticate', 'Bearer realm="token received after login"')
            .json({
                error: 'Token not provided'
            })
    }
}

app.get( '/v1/orders', authenticateUser, (req, res) => {
    res.send( `Página autenticada ${ req.user.username }` );
});

app.get( '/v1/error', ( req, res ) => {
    res.status( 404 ).json({
        error: 'Endpoint not found'
    });
});

app.use(function(err, req, res, next) {
    if( !err ) return next();
    console.log( 'Error, algo salio mal', err );
    res.status( 500 ).send( 'Error' );
});


app.listen( 3000, () => {
    console.log( 'Servidor iniciado' );
});