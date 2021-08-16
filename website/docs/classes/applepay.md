---
title: ApplePay
---

## Methods

### canMakePayments

Checks if the device supports Apple Pay and can make payments, based on the supplied options.

#### Usage

        
 
```typescript
const { canMakePayments } = await ApplePay.canMakePayments({
 merchantIdentifier: merchantIdentifier,
 supportedNetworks: supportedNetworks,
});
if (canMakePayments) {
 // start building a payment request...
}
```
 

#### Parameters

Name | Type |
:------ | :------ |
`options` | [*ApplePayAvailabilityOptions*](../interfaces/applepayavailabilityoptions) |

**Returns:** <span class="return-code">*Promise*<[*ApplePayCanMakePaymentsResponse*](../interfaces/applepaycanmakepaymentsresponse)\></span>

### makePaymentRequest

Attempts to make request payment by presenting the payment sheet over the app.

#### Usage

        
 
```typescript
const request: ApplePayRequest = {...}
const { success } = await ApplePay.makePaymentRequest(request);
if (success) {
 alert("Payment successful!");
}
```
 

#### Parameters

Name | Type |
:------ | :------ |
`options` | [*ApplePayRequest*](../interfaces/applepayrequest) |

**Returns:** <span class="return-code">*Promise*<[*ApplePayPaymentRequestResponse*](../interfaces/applepaypaymentrequestresponse)\></span>

### setLogLevel

Set the verbosity of event logging.

#### Parameters

Name | Type |
:------ | :------ |
`level` | [*LogLevel*](../enums/loglevel) |

**Returns:** <span class="return-code">*void*</span>
