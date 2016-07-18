module.exports = [{
    /**
     * regular expression of URL
     */
    pattern: 'https://onesignal.com/api/v1/(.*)',

    /**
     * returns the data
     *
     * @param match array Result of the resolution of the regular expression
     * @param params object sent by 'send' function
     * @param headers object set by 'set' function
     */
    fixtures: function(match, params, headers) {

        // Notifications endpoint
        if (match[1] === 'notifications') {

            const contents = params['contents'];
            const includedSegments = params['included_segments'];

            // 200 - Success
            if (contents && includedSegments) {
                return {
                    statusCode: 200
                };
            }

            // 400 - no message specified
            if (!contents) {
                throw new Error(400);
            }

            // 400 - message specified, but no one to send to
            if (contents && !includedSegments) {
                throw new Error(400);
            }
        }
    },

    /**
     * returns the result of the GET request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    get: function(match, data) {
        return {
            body: data
        };
    },

    /**
     * returns the result of the POST request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    post: function(match, data) {
        return data;
    }
}];
