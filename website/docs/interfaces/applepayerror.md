---
title: ApplePayError
---

An error that can be thrown by the plugin.

#### Usage

        
 
```typescript
try {
 const result = await ApplePay.makePaymentRequest(paymentRequest);
} catch (err) {
 switch (err.code) {
   case ApplePayErrorCodes.UserCanceled:
     console.log('user canceled the transaction');
     break;
   case ApplePayErrorCodes.AuthorizationFailed:
     console.log("the payment authorization failed");
     break
   default:
     throw err;
  }
}
```
 

## Properties

### code

- Type: [ApplePayErrorCodes](../enums/applepayerrorcodes)

The error code enum representing the error.

### message

- Type: `string`

A text description of the error that occurred.
