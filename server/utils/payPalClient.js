const paypal = require('@paypal/checkout-server-sdk');
require('dotenv').config();


// let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
// let client = new paypal.core.PayPalHttpClient(environment);

var clientId = process.env.PAYPAL_CLIENT_ID;
var clientSecret = process.env.PAYPAL_CLIENT_SECRET;
var PAYPAL_API = 'https://api-m.sandbox.paypal.com';

module.exports = {
    clientId,
    clientSecret,
    PAYPAL_API
}