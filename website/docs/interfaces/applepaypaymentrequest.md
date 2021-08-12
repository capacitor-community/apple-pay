---
title: ApplePayPaymentRequest
---

An object describing the payment request, including information about payment processing capabilities, payment amounts and more.

## Properties

### countryCode

- Type: `string`

The merchant’s two-letter ISO 3166 country code.

### currencyCode

- Type: `string`

The three-letter ISO 4217 currency code for the payment.

### lineItems

- Type: [ApplePaySummaryItem](./applepaysummaryitem)

A set of line items that explain recurring payments and additional charges and discounts.

### merchantCapabilities

- Type: [ApplePayMerchantCapability](../enums/applepaymerchantcapability)

The payment capabilities supported by the merchant.

### supportedNetworks

- Type: [ApplePaySupportedNetwork](../enums/applepaysupportednetwork)

The payment networks the merchant supports.

### total

- Type: [ApplePaySummaryItem](./applepaysummaryitem)

A line item representing the total for the payment.
