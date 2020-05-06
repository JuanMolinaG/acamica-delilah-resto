const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const Token = require( './helpers/jwt/jwtGenerator' );
const { authenticateUser, validateRole } = require( './helpers/middlewares' );
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


const port = process.env.PORT || 3000;
app.listen( port, () => {
    console.log( `Server started at ${ port } port` );
});