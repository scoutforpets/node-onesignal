import Client from '../lib/client';

import test from 'ava';

// Tests

test('sends a notification (message as string)', async t => {

    const client = new Client(process.env.APP_ID, process.env.REST_API_KEY);

    const message = 'Test Message';
    const options = {
        included_segments: 'all'
    };

    const response = await client.sendNotification(message, options);

    t.is(response.statusCode, 200);
});

test('sends a notification (message as object)', async t => {

    const client = new Client(process.env.APP_ID, process.env.REST_API_KEY);

    const message = {
        en: 'Test Message'
    };

    const options = {
        included_segments: 'all'
    };

    const response = await client.sendNotification(message, options);

    t.is(response.statusCode, 200);
});

test('handles API error', async t => {

    const client = new Client(process.env.APP_ID, process.env.REST_API_KEY);

    const message = 'Test Message';
    const options = {};

    const response = client.sendNotification(message, options);

    t.throws(response);
});
