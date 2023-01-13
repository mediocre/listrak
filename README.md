# listrak

[![Build Status](https://github.com/mediocre/listrak/workflows/build/badge.svg?branch=main)](https://github.com/mediocre/listrak/actions?query=workflow%3Abuild+branch%3Amain)
[![Coverage Status](https://coveralls.io/repos/github/mediocre/listrak/badge.svg?branch=main)](https://coveralls.io/github/mediocre/listrak?branch=main)

Our API allows developers to integrate with Listrak's application. It enables the seamless automation of a broad set of functionality, ranging from basic tasks to complex processes.

https://api.listrak.com/email

## Usage

```javascript
const Listrak = require('@mediocre/listrak');

const listrak = new Listrak({
    client_id: 'your_api_key',
    client_secret: 'your_api_secret'
});
```

### listrak.getAccessToken(callback)

Authentication is accomplished using OAuth 2.0.

https://api.listrak.com/email#section/Authentication

**Example**

```javascript
listrak.getAccessToken(function(err, accessToken) {
    console.log(accessToken);
});
```