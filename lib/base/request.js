const axios = require( 'axios' );

class RequestBase {

    constructor( { endpointUrl, ...consumerConfig } ) {

        this._axios = axios.default( {
            baseURL: endpointUrl,
        } );

        this.consumerConfig = consumerConfig;

    }

}

module.exports = RequestBase;
