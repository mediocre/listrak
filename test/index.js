const assert = require('assert');

const cache = require('memory-cache');

const Listrak = require('../index');

describe('Listrak.getAccessToken', function() {
    this.timeout(5000);

    beforeEach(function() {
        cache.clear();
    });

    it('should return an error for invalid environment_url', function(done) {
        const listrak = new Listrak({
            base_oauth_url: 'invalid'
        });

        listrak.getAccessToken(function(err, accessToken) {
            assert(err);
            assert.strictEqual(err.message, 'Invalid URI "invalid/OAuth2/Token"');
            assert.strictEqual(err.status, undefined);
            assert.strictEqual(accessToken, undefined);

            done();
        });
    });

    it('should return an error for non 200 status code', function(done) {
        const dhlEcommerceSolutions = new Listrak({
            base_oauth_url: 'https://httpbin.org/status/500#',
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET
        });

        dhlEcommerceSolutions.getAccessToken(function(err, accessToken) {
            assert(err);
            assert.strictEqual(err.message, 'Internal Server Error');
            assert.strictEqual(err.status, 500);
            assert.strictEqual(accessToken, undefined);

            done();
        });
    });

    it('should return a valid access token', function(done) {
        const listrak = new Listrak({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET
        });

        listrak.getAccessToken(function(err, accessToken) {
            assert.ifError(err);

            assert(accessToken);
            assert(accessToken.access_token);
            assert(accessToken.expires_in);
            assert.strictEqual(accessToken.token_type, 'bearer');

            done();
        });
    });

    it('should return the same access token on subsequent calls', function(done) {
        const listrak = new Listrak({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET
        });

        listrak.getAccessToken(function(err, accessToken1) {
            assert.ifError(err);

            listrak.getAccessToken(function(err, accessToken2) {
                assert.ifError(err);
                assert.deepStrictEqual(accessToken2, accessToken1);
                done();
            });
        });
    });
});