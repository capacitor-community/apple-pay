---
title: ApplePayWeb
---

## Constructors

### constructor

#### Parameters

Name | Type |
:------ | :------ |
`config?` | WebPluginConfig |

**Returns:** <span class="return-code">[*ApplePayWeb*](./applepayweb)</span>

Inherited from: void

## Accessors

### ApplePaySession

**Returns:** <span class="return-code">ApplePayJS</span>

## Methods

### canMakePayments

Checks if the device supports Apple Pay based on the supplied options, and can make payments

#### Parameters

Name | Type |
:------ | :------ |
`options` | [*ApplePayAvailabilityOptions*](../interfaces/applepayavailabilityoptions) |

**Returns:** <span class="return-code">*Promise*<{ `canMakePayments`: *boolean*  }\></span>

Implementation of: void

### checkApplePayJSAvailable

**Returns:** <span class="return-code">*boolean*</span>

### makePaymentRequest

Attempts to make request payment by presenting the payment sheet over the app.

#### Parameters

Name | Type |
:------ | :------ |
`options` | [*ApplePayRequest*](../interfaces/applepayrequest) |

**Returns:** <span class="return-code">*Promise*<[*ApplePayPaymentRequestResponse*](../interfaces/applepaypaymentrequestresponse)\></span>

Implementation of: void

### setLogLevel

#### Parameters

Name | Type |
:------ | :------ |
`level` | [*LogLevel*](../enums/loglevel) |

**Returns:** <span class="return-code">*void*</span>

Implementation of: void
