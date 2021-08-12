---
title: ApplePayMerchantValidationParams
---

An object containing request parameters for server-side merchant validation.

## Properties

### displayName

- Type: `string`

The display name of your store, UTF-8, unlocalized, with a max length of 64 characters.

### initiative

- Type: `web` | `native`

The type of the app making the request.

The values for initiative and initiativeContext depend on the kind of application you’re building:
- For Apple Pay on the web, use "web" for the initiative parameter. For the initiativeContext parameter, provide your fully qualified domain name associated with your Apple Pay Merchant Identity Certificate.

### initiativeContext

- Type: `string`

A value you provide based on the initiative.

### merchantIdentifier

- Type: `string`

The merchant identifier you registered with Apple for use with Apple Pay.
