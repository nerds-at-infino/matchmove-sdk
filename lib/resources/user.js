const { Request } = require( '../base' );

class UserResource extends Request {

    constructor( attributes ) {

        if ( !( this instanceof UserResource ) ) { // eslint-disable-line no-this-before-super

            return new UserResource( attributes );

        }

        super();

    }

    save() {

        return Promise.resolve( this.attributes );

    }

}

module.exports = UserResource;
