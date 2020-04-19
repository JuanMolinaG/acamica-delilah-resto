const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const Token = require( './helpers/jwt/jwtGenerator' );
const Users = require( './models/Users' );

const userToken = new Token();

const app = express();
app.use( bodyParser.json() );
app.use( cors() );

app.get( '/v1/users', ( req, res ) => {
    Users.findAll({
        attributes: { exclude: ['password'] }
    }).then( users => {
        res.json( users );
    }).catch( error => {
        console.log('error :', error);
    })
});

app.post( '/v1/users', ( req, res ) => {
    res.send( req.body );
});

app.post( '/v1/login', async ( req, res ) => {
    const { username, password } = req.body;
    if ( username && password ) {
        const token = await userToken.generateToken( username )
        res.json({
            access_token: token,
            token_type: 'Bearer',
            expires: "24 hours"
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
                error: 'Invalid token or expired'
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

const validateRole = ( req, res, next ) => {
    const role = req.user.userData.role;

    if ( role === 'administrator' ) {
        return next();
    } else {
        res.status( 403 )
            .json({
                error: 'You do not have permission to access this'
            });
    }
}

app.get( '/v1/orders', authenticateUser, validateRole, (req, res) => {
    res.send( `Página autenticada ${ req.user.userData.username }` );
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