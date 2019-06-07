const test = require( 'tape' );

const MatchMove = require( '../lib' );

const Fixtures = {

    resources: [

        'User',

    ],

    config: {

        endpointUrl: 'https://google.com',
        consumerKey: 'foo',
        consumerSecret: 'bar',

    },

};

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

        t.throws( () => new MatchMove( value ), TypeError,
            `throws an for config type="${ JSON.stringify( value ) }"` );

    } );

    t.end();

} );

test( 'creates a new instance (new keyword)', t => {

    const instance = new MatchMove( Fixtures.config );

    t.ok( instance, 'the instance is a valid object' );
    t.ok( instance instanceof MatchMove, 'initialization parameters are correct' );

    Fixtures.resources.forEach( key => {

        t.ok( instance[ key ], `the resource "${ key }" exists` );
        t.equal( typeof instance[ key ], 'function', `the resource "${ key }" has the correct type` );

    } );

    t.end();

} );

test( 'creates a new instance (without new keyword)', t => {

    const instance = new MatchMove( Fixtures.config );

    t.ok( instance, 'the instance is a valid object' );
    t.ok( instance instanceof MatchMove, 'initialization parameters are correct' );

    Fixtures.resources.forEach( key => {

        t.ok( instance[ key ], `the resource "${ key }" exists` );
        t.equal( typeof instance[ key ], 'function', `the resource "${ key }" has the correct type` );

    } );

    t.end();

} );
