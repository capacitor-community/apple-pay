---
title: ApplePayMerchantValidationParams
---

An object containing request parameters for server-side merchant validation. These values are only required if your application will run on the web.

## Properties

### displayName

- Type: `string`

The display name of your store, UTF-8, unlocalized, with a max length of 64 characters.

### initiative

- Type: `web`

This value should be set to `web`.

### initiativeContext

- Type: `string`

This value should be your fully qualified domain name associated with your Apple Pay Merchant Identity Certificate.

### merchantIdentifier

- Type: `string`

The merchant identifier you registered with Apple for use with Apple Pay.
