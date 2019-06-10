const crypto = require( 'crypto' );
const axios = require( 'axios' );

const internals = {};

internals.toBuffer = str => Buffer.from( str, 'utf8' );
internals.concatBuffers = ( ...args ) => Buffer.concat( [ ...args ] );
internals.CONSTANTS = {

    AES_BLOCK_SIZE: 16,
    SALT_HEADER: internals.toBuffer( 'Salted__' ),

};

internals.generateKeyAndIv = function generateKeyAndIv( salt, key ) {

    const hash = ( ...args ) => crypto.createHash( 'md5' )
        .update( this.concatBuffers( ...args ) ).digest();

    let prev = Buffer.from( [] );
    const m = [];

    for ( let i = 0; i < 3; i++ ) {

        prev = hash( prev, key, salt );
        m.push( ...prev );

    }

    return {

        key: Buffer.from( m.slice( 0, 32 ) ),
        iv: Buffer.from( m.slice( 32 ) ),

    };

};

internals.pad = function pad( data ) {

    const paddingLength = internals.CONSTANTS.AES_BLOCK_SIZE -
        ( data.length % internals.CONSTANTS.AES_BLOCK_SIZE );

    const padding = new Array( paddingLength ).fill( paddingLength );

    return Buffer.concat( [ data, Buffer.from( padding ) ] );

};

internals.encrypt = function encrypt( data, key, iv ) {

    const paddedData = internals.pad( data );
    const cipher = crypto.createCipheriv( 'aes-256-cbc', key, iv );

    let block = cipher.update( paddedData.slice(
        internals.CONSTANTS.AES_BLOCK_SIZE ) ).toString( 'base64' );

    block += cipher.final( 'base64' );

    return Buffer.concat(
        [
            Buffer.from( paddedData.slice( 0, internals.CONSTANTS.AES_BLOCK_SIZE ) ),
            Buffer.from( block, 'base64' ),
        ]
    );

};

class RequestBase {

    constructor( { endpointUrl, ...consumerConfig } ) {

        this._axios = axios.default( {
            baseURL: endpointUrl,
        } );

        this.consumerConfig = consumerConfig;

    }

    encryptPayload( plaintext, password ) {

        const plaintextBuffer = internals.toBuffer( plaintext );
        const passwordBuffer = internals.toBuffer( password );
        const salt = Buffer.from( crypto.randomBytes( 8 ) );

        const data = internals.concatBuffers( internals.CONSTANTS.SALT_HEADER, salt,
            plaintextBuffer );

        const { key, iv } = internals.generateKeyAndIv( salt, passwordBuffer );

        return internals.encrypt( data, key, iv ).toString( 'base64' );

    }

}

module.exports = RequestBase;
