import Client from '../lib/client';

import test from 'ava';
import Superagent from 'superagent';
import SuperagentMockConfig from './helpers/superagent-mock';

const superagentMock = require('superagent-mock')(Superagent, SuperagentMockConfig);


// Globals

let client;


// Test setup

test.before(t => {

    client = new Client(process.env.APP_ID, process.env.REST_API_KEY);
});


// Tests


test('throws an error if no app id is specified', t => {

    t.throws(() => {
        new Client();
    });
});


test('throws an error if no api key is specified', t => {

    t.throws(() => {
        new Client('a0944967-e2b6-4549-91d2-91fdd290ad94');
    });
});


test('sends a notification (message as string)', async t => {

    const message = 'Test Message';
    const options = {
        included_segments: 'all'
    };

    const response = await client.sendNotification(message, options);

    t.is(response.statusCode, 200);
});


test('sends a notification (message as object)', async t => {

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
