---
title: Backend Requirements
sidebar_label: Backend Requirements
---

Apple Pay requires 2 backend API endpoints (described below) that you will need to implement. 

You will specify these endpoints in the `merchantValidation.url` and `paymentAuthorization.url` properties when calling `makePaymentRequest`.

It is recommended to implement these in their own service. For reference take a look at this [sample service](https://github.com/ionic-team/apple-pay-relay-example).

## Merchant Validation API

> The Merchant Validation API is only required if you want your application to run on the web. When your app runs natively it will never call this API. 

The plugin will call the `merchantValidation.url` with a http `POST` method. 

You may choose a name for the endpoint (eg `https://api.my-company.com/session`)

To implement this API endpoint you code will implement a Http `GET` call to the Apple Pay Gateway:

```
https://apple-pay-gateway.apple.com/paymentservices/paymentSession
```

The body of the request must follow:

```json
{
    "merchantIdentifier": "my-apple-pay-merchant-identifier",
    "displayName": "My Store",
    "initiative": "web",
    "initiativeContext": "www.my-company.com"
}
```

- `merchantIdentifier` is the Merchant Identifier you chose in the Apple Developer portal
- `displayName` is the name you want to appear for the Payment Sheet
- `initiative` should be hard coded to `web`
- `initiativeContext` is the FQND (Fully Qualified Domain Name) where your payment page is served (**not** your API)

The response from `apple-pay-gateway.apple.com` is opaque, you do not need to know what the response shape is so type it as `any`. It should be returned as the response from your service.

You may get an error back from Apple which will be in the `json` form of:

```typescript
export interface PaymentSessionError {
  statusMessage: string;
  statusCode: string;
}
```

> IMPORTANT: When calling `apple-pay-gateway.apple.com` the request must:
- Use the **Merchant Certificate and Private Key** you defined in the Apple Developer portal.
- Use at a minimum TLS 1.2.

### Sample Code
Here is a sample implementation of the merchant validation endpoint that which uses `Node` and the `node-fetch` package.

```typescript
import fetch from 'node-fetch';
import https from 'https';
import fs from 'fs';
```

```typescript
const response = await getApplePaySession(request);
// You will pass response back to your application
return { statusCode: 200, body: JSON.stringify(response) };
```

```typescript
async function getApplePaySession(): Promise<any> {  
  const response = await fetch(
    'https://apple-pay-gateway.apple.com/paymentservices/paymentSession',
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(
        {
          merchantIdentifier: 'my-apple-pay-merchant-identifier',
          displayName: 'My Store',
          initiative: 'web',
          initiativeContext: 'www.my-company.com'
        }),
      agent: getAgent()
    }
  );
  return await response.json();
}

function getAgent(): https.Agent {
  return new https.Agent({
    rejectUnauthorized: false,
    keepAlive: false,
    minVersion: 'TLSv1.2',

    // Password for the Merchant Certificate p12 file
    passphrase: 'super-secret', 

    // Note we dont use the fs `utf-8` encoding when reading a p12 file
    pfx: fs.readFileSync('./certs/pple-pay-merchant-id.p12') 
  });
}
```

> In this example we have taken the **Merchant Certicate** downloaded from the Apple Developer portal, opened it in the Mac app `Keychain Access` and exported it as `p12` file creating a password (dont use `super-secret`). The `p12` file contains both the certificate and private key so we treat the password like any secret, and keep it **out** of our code repository rather than hard coding like in the sample above.

### CORS

As your web application will call this API endpoint you must also deal with CORS otherwise you will get an error like: `Failed to load resource: Request header field Content-Type is not allowed by Access-Control-Allow-Headers`. 

Your backend can minimally implement CORS like:

```typescript
if (event.httpMethod == 'OPTIONS') {
   return {
       statusCode: 200,
       headers: {
           'Access-Control-Allow-Origin': '*',
           'Access-Control-Allow-Headers': '*'
        }
    }
}
```    


## Payment Authorization API

The plugin will call the `paymentAuthorization.url` which you must implement.

This endpoint will authorize a transaction for a payment processor. Your code should accept the token data and make a payment request with your chosen payment processor. The response should indicate sucess if the payment was succcessful.

When a payment is processed with the plugin this endpoint will be called with a `post` request and a body similar to this (values shorted for brevity):
```json
{
  "request": {
    "countryCode": "US",
    "currencyCode": "USD",
    "merchantCapabilities": [
      "supports3DS"
    ],
    "supportedNetworks": [
      "amex",
      "masterCard",
      "visa"
    ],
    "lineItems": [],
    "total": {
      "label": "Hot Dog",
      "amount": "5.00",
      "type": "final"
    }
  },
  "token": {
    "paymentMethod": {
      "network": "MasterCard",
      "type": "credit",
      "displayName": "MasterCard 7951"
    },
    "transactionIdentifier": "F9123768BEA8086F1FB011CD3C10079DE9FD635FC5F43DD1E4315A8F4264F1B3",
    "paymentData": {
      "data": "tE9equ6CGvj2b...GAM6mdBMARoBA==",
      "signature": "MIAGCSqGSIb3DQE...9gCMcSQWK9uQOp1gAAAAAAAA=",
      "header": {
        "publicKeyHash": "0/jmqztUB...Ms9xXBZQTY=",
        "ephemeralPublicKey": "MFkwEwYHKoZIzj0CA...rZUd7pOIawDDUYAoKw==",
        "transactionId": "f9123768fae8096f1fb011cd3c10079de9fd635fc5f63dd1e4315a8f4264f1b3"
      },
      "version": "EC_v1"
    }
  }
}
```

You can return a response and it will be returned to the app. So if you return a JSON response of:
```json
{
  "message": "Hello World"
}
```

Then in the app your call for `const response = await getApplePaySession(request);` will have a `response` of:
```json
{ "success": true, "data": {"message": "Hello World"}}
```