const test = require( 'tape' );

const utils = require( '../lib/utils' );

test( 'parses the configuration correctly', t => {

    const testConfig = {

        endpointUrl: 'http://google.com',
        consumerKey: 'foo',
        consumerSecret: 'bar',

    };

    t.ok( utils.validateConfig( testConfig ), 'returns true when the configuration is valid' );
    t.end();

} );

test( 'throws an error when invalid values are provided', t => {

    const keys = [

        'consumerKey',
        'consumerSecret',
        'endpointUrl',

    ];

    const keyValues = [

        '',
        null,
        undefined,
        [],
        {},
        12,
        true,

    ];

    keys.forEach( key => {

        keyValues.forEach( value => {

            t.throws( () => utils.validateConfig( { [ key ]: value } ),
                TypeError, `throws an error when ${ key }=${ JSON.stringify( value ) }` );

        } );

    } );

    t.end();

} );

test( 'throws an error when invalid url is provided', t => {

    const testConfig = {

        consumerKey: 'foo',
        consumerSecret: 'bar',

    };

    const testCases = [

        'htt:/go.ur',
        'www',
        'www.www',

    ];

    testCases.forEach( tCase => {

        t.throws( () => utils.validateConfig( { ...testConfig, endpointUrl: tCase } ),
            Error, `throws an error when endpointUrl=${ tCase }` );

    } );

    t.end();

} );
