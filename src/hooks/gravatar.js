'use strict';

const crypto = require('crypto');

const gravatarUrl = 'https://s.gravatar.com/avatar';

const query = 's=60';


// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function() { // eslint-disable-line no-unused-vars
    return function(hook) {
        const { email } = hook.data;

        const hash = crypto.createHash('md5').update(email).digest('hex');

        hook.data.avatar = `${gravatarUrl}/${hash}?${query}`
            // Hooks can either return nothing or a promise
            // that resolves with the `hook` object for asynchronous operations
        return Promise.resolve(hook);
    };
};