const Token = require( './jwt/jwtGenerator' );

const userToken = new Token();

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
            });
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

module.exports = { authenticateUser, validateRole };