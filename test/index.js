import Client from '../lib/client';

import test from 'ava';

// Tests

test('sends a notification (message as string)', async t => {

    const client = new Client(process.env.APP_ID, process.env.REST_API_KEY);

    const message = 'Let the playas play!';
    const options = {
        isIos: true,
        included_segments: 'all'
    };

    const response = await client.sendNotification(message, options);

    t.is(response.statusCode, 200);
});

test('sends a notification (message as object)', async t => {

    const client = new Client(process.env.APP_ID, process.env.REST_API_KEY);

    const message = {
        en: 'Let the playas play!'
    };

    const options = {
        isIos: true,
        included_segments: 'all'
    };

    const response = await client.sendNotification(message, options);

    t.is(response.statusCode, 200);
});

test('handles API error', async t => {

    const client = new Client(process.env.APP_ID, process.env.REST_API_KEY);

    const message = 'Let the playas play!';
    const options = {
        isIos: true
    };

    const response = client.sendNotification(message, options);

    t.throws(response);
});
