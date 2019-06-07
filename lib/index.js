const utils = require( './utils' );

module.exports = {

    /**
     * Returns a new instance of the MatchMove SDK with the specified
     * configuration paramters.
     * @param {object} config the configuration to use while creating a new instance
     * @param {string} config.endpointUrl the endpoint URL assigned to you by MatchMove
     * @param {string} config.consumerSecret the consumer secret
     * @param {string} config.consumerKey the consumer key
     */
    newInstance( config ) {

        if ( typeof config !== 'object' || Array.isArray( config ) ) {

            throw new TypeError( `expected "object" for configuration; got ${ typeof config }` );

        }

        if ( !utils.validateConfig( config ) ) {

            throw new Error( 'There was an error in validating the configuration.' );

        }

    },

};
