const util = require( 'util' );
const { exec } = require( 'child_process' );

const test = require( 'tape' );

const { Request } = require( '../lib/base' );

test( 'encrypts the data correctly', t => {

    t.plan( 2 );

    const KEY = 'randomkey';
    const DATA = 'foobarfoobar';

    const r = new Request( { endpointUrl: 'https://google.com' } );
    const e = r.encryptPayload( DATA, KEY );

    const cmd = util.format( 'echo "%s" | openssl aes-256-cbc -k "%s" -d -a', e, KEY );
    exec( cmd, ( error, stdout, stderr ) => {

        if ( error || stderr.length !== 0 ) {

            t.fail( error || stderr );

        }

        t.equal( stdout.trim(), DATA, 'the decrypted data is correct' );

    } );

    t.ok( e, 'the encrypted data is a string' );

} );
