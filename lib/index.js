const utils = require( './utils' );
const resourceBootstrap = require( './resources' );

const internals = {

    attachResources( instance ) {

        resourceBootstrap( instance );

    },

};

/**
 * Represents the base class for the MatchMove SDK.
 * @class
 */
class MatchMoveSDK {

    /**
     * Initializes a new instance of the MatchMove SDK class.
     * @param {object} config the configuration to use while creating a new instance
     * @param {string} config.endpointUrl the endpoint URL assigned to you by MatchMove
     * @param {string} config.consumerSecret the consumer secret
     * @param {string} config.consumerKey the consumer key
     */
    constructor( config ) {

        if ( !( this instanceof MatchMoveSDK ) ) {

            return new MatchMoveSDK( config );

        }

        if ( typeof config !== 'object' || Array.isArray( config ) ) {

            throw new TypeError( `expected "object" for configuration; got ${ typeof config }` );

        }

        if ( !utils.validateConfig( config ) ) {

            throw new Error( 'There was an error in validating the configuration.' );

        }

        this.config = config;
        internals.attachResources( this );

    }

}

module.exports = MatchMoveSDK;
