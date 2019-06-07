const test = require( 'tape' );

const MatchMove = require( '../lib' );

test( 'throws an error when the configuration object is of the wrong type', t => {

    const keyValues = [

        'foo',
        null,
        undefined,
        [],
        12,
        true,

    ];

    keyValues.forEach( value => {

        t.throws( () => MatchMove.newInstance( value ), TypeError,
            `throws an for config type="${ JSON.stringify( value ) }"` );

    } );

    t.end();

} );
