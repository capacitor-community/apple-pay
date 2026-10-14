---
title: Tutorial
sidebar_label: Tutorial
---

This tutorial shows how to implement Apple Pay for a purchase page that is displayed on iOS Safari, Safari on a Mac, or in a Capacitor app using the Ionic Apple Pay Plugin.

## Overview

Apple Pay works only in these scenarios:

* In the iOS Safari browser.
* In the Mac Safari browser.
* In a Capacitor App when using the Ionic Apple Pay Plugin.
* In a Capacitor App if the page is opened with the Capacitor Browser Plugin.

Apple Pay does not work in these scenarios:

* On an Android device.
* On a non-Safari iOS browser.
* On a non-Safari browser on Mac.
* In the Web View of a Cordova or Capacitor App (without a plugin).
* Where Apple Pay has not been set up on the device.

## Your Purchase Page

Creating your payment web page layout is out of scope for this tutorial. But be sure to serve it using `https` and have an interactive button to buy.

> Note: When you call Apple Pay and have an awaited promise in your code you will likely get an error `InvalidAccessError: Must create a new ApplePaySession from a user gesture handler`. To fix this you will need to refactor your code to remove the `await` call and make the call synchronous.

## Is Apple Pay Supported

Here is a function that uses [canMakePayments](classes/applepay.md#canmakepayments) and returns a boolean that we can use to control whether the Apple Pay button is hidden.

```typescript
  async checkForApplePay(): Promise<boolean> {
    const res = await ApplePay.canMakePayments({
      merchantIdentifier: 'my-apple-pay-merchant-identifier',
      supportedNetworks: [
        ApplePaySupportedNetwork.AMEX,
        ApplePaySupportedNetwork.DISCOVER,
        ApplePaySupportedNetwork.VISA,
        ApplePaySupportedNetwork.VPAY,
        ApplePaySupportedNetwork.PRIVATELABEL,
        ApplePaySupportedNetwork.MASTERCARD]
    });        

    return res.canMakePayments;
  }
```

You will need to have configured a [Merchant Identifier](configuration#enable-apple-pay) and added the [Apple Pay Capability](configuration#apple-pay-capability) for this function to return `true`.

## Make a Payment

A payment should be triggered by a user gesture (like clicking a button) for it to work on Web.

Before initiating a payment you need to define what the user is purchasing. 

Here is a sample request to purchase a $5 hot dog with a Credit Card:

```typescript
import { 
    ApplePay, 
    ApplePayMerchantCapability, 
    ApplePayRequest, 
    ApplePaySupportedNetwork
    } from '@ionic-enterprise/apple-pay';
```

```typescript
const request: ApplePayRequest = {
    version: 5,
    merchantValidation: {
        url: 'https://api.my-company.com/session',
        params: {
            merchantIdentifier: 'my-apple-pay-merchant-identifier',
            displayName: 'My Store',
            initiative: 'web',
            initiativeContext: 'www.my-company.com'
        }
    },
    paymentAuthorization: {
        url: 'https://api.my-company.com/payment'
    },
    request: {
        merchantCapabilities: [
            ApplePayMerchantCapability.THREEDS, 
            ApplePayMerchantCapability.CREDIT],
        supportedNetworks: [
            ApplePaySupportedNetwork.AMEX,
            ApplePaySupportedNetwork.MASTERCARD,
            ApplePaySupportedNetwork.VISA],
        countryCode: 'US',
        currencyCode: 'USD',
        lineItems: [],
        total: {
            label: 'Hot Dog',
            type: 'final',
            amount: '5.00'
        }
    }
};
```

Finally, we'll initiate the payment request. This will show the familar Apple Pay sheet.

```typescript
try
{
    const response = await ApplePay.makePaymentRequest(request);
    if (response.success) {
        // Enjoy our hot dog
    }
} catch (error) {
    // No hot dog for you
    console.error('makePaymentRequest Failed', error);
}
```

This should cover the happy path of purchasing a hot dog, but there are a few points in this code that need explanation:

- If you are intending to only ever run your app natively and **never in a web context** then you can:
   - Set the `merchantValidation` `url` to `undefined`.
   - Set `initiativeContext` to `undefined`.
   - Leave `initiative` as `web`.
- The `merchantCapabilities` must contain at least `ApplePayMerchantCapability.THREEDS`.
- The `lineItems` property can specify individual items comprising the purchase but can be omitted with `[]`.
- The `version` property is for the Apple Pay version number (see [Apple Pay Versions](interfaces/applepayrequest#version))


