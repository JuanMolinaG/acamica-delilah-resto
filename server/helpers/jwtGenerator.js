const secret_key = require('./jwtSecretKey');
const jwt = require( 'jsonwebtoken' );

module.exports = class Token{
    constructor() {
        this.secret_key = secret_key;
        this.jwt = jwt;
    }

    generateToken( username ) {
        let generatedToken = this.jwt.sign({
            username
        }, this.secret_key);
        
        return generatedToken;
    }

    verifyToken( receivedToken ) {
        let verifiedToken = this.jwt.verify( receivedToken, this.secret_key );
        return verifiedToken;
    }
}