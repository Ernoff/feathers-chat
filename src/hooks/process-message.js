'use strict';
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function() { // eslint-disable-line no-unused-vars
    return function(hook) {

        const user = hook.params.user;

        const text = hook.data.text

            .substring(0, 400)

        .replace(/&/g, '&amp;').replace(/>/g, '&gt;');

        hook.data = {
            text,
            userId: user._id,

            createdAt: new Date().getTime()

        };
        // Hooks can either return nothing or a promise
        // that resolves with the `hook` object for asynchronous operations
        return Promise.resolve(hook);
    };
};