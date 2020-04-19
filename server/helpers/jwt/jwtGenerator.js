const secret_key = require('./jwtSecretKey');
const jwt = require( 'jsonwebtoken' );
const Users = require( '../../models/Users' );

module.exports = class Token{
    constructor() {
        this.secret_key = secret_key;
        this.jwt = jwt;
    }

    async generateToken( username ) {
        const userRole = await this.getUserRole( username );
        let userData;

        if ( userRole === 'administrator') {
            userData = {
                username,
                role: userRole
            };
        } else {
            userData = {
                username
            };
        }

        const generatedToken = this.jwt.sign({
            userData
        }, this.secret_key, /*{ expiresIn: '24h'}*/ );
        
        return generatedToken;
    }

    verifyToken( receivedToken ) {
        let verifiedToken = this.jwt.verify( receivedToken, this.secret_key );
        return verifiedToken;
    }

    getUserRole( username ) {
        const result = Users.findAll({
                attributes: ['role'],
                where: {
                    username: username
                }
            }).then( user => {
                return user[0].role;
            }).catch( error => {
                console.log( 'error :', error );
            });
        return result;
    }
}
