const cache = require('memory-cache');
const createError = require('http-errors');
const request = require('request');

function Listrak(args) {
    const options = Object.assign({
        base_url: 'https://api.listrak.com',
        base_oauth_url: 'https://auth.listrak.com'
    }, args);

    /**
     * Authentication is accomplished using OAuth 2.0.
     * https://api.listrak.com/email#section/Authentication
     */
    this.getAccessToken = function(callback) {
        const url = `${options.base_oauth_url}/OAuth2/Token`;
        const key = `${url}?client_id=${options.client_id}`;

        // Try to get the access token from memory cache
        const accessToken = cache.get(key);

        if (accessToken) {
            return callback(null, accessToken);
        }

        const req = {
            form: {
                client_id: options.client_id,
                client_secret: options.client_secret,
                grant_type: 'client_credentials'
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            json: true,
            url
        };

        request.post(req, function(err, res, response) {
            if (err) {
                return callback(err);
            }

            if (res.statusCode !== 200) {
                const err = createError(res.statusCode);
                err.response = response;

                return callback(err);
            }

            // Put the access token in memory cache
            cache.put(key, response, response.expires_in * 1000 / 2);

            callback(null, response);
        });
    };
}

module.exports = Listrak;