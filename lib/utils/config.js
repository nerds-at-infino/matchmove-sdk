const internals = {

    formatTypeError( key, obj, expected ) {

        return new TypeError( `expected ${ expected } for ${ key }; got "${ typeof obj }"` );

    },

    isValidUrl( url ) {

        const urlRegex =
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/; // eslint-disable-line no-useless-escape

        return urlRegex.test( url );

    },

};

module.exports = function validateConfig( { consumerKey, consumerSecret, endpointUrl } ) {

    const normalize = str => str ? str.trim() : '';

    consumerKey = normalize( consumerKey ) || undefined;
    consumerSecret = normalize( consumerSecret ) || undefined;
    endpointUrl = normalize( endpointUrl ) || undefined;

    if ( typeof consumerKey !== 'string' ) {

        throw internals.formatTypeError( 'consumerKey', consumerKey, 'string' );

    }

    if ( typeof consumerSecret !== 'string' ) {

        throw internals.formatTypeError( 'consumerSecret', consumerSecret, 'string' );

    }

    if ( typeof endpointUrl !== 'string' ) {

        throw internals.formatTypeError( 'consumerSecret', consumerSecret, 'string' );

    }

    if ( !internals.isValidUrl( endpointUrl ) ) {

        throw new Error( 'expected "endpointUrl" to be a valid URL' );

    }

    return true;

};
