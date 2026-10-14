---
title: Installation
sidebar_label: Installation
---

Follow these steps to install Apple Pay into your app.

> This plugin requires Capacitor 8 or later.

```bash
npm install @capacitor-community/apple-pay
npx cap sync
```

## Getting Started

Integrating with your application only requires two basic API calls. First, check if the user is running a device capable of using Apple Pay in the current context by calling the `canMakePayments` method, then make the payment request using `makePaymentRequest`.

```typescript
await ApplePay.canMakePayments({});
await ApplePay.makePaymentRequest({});
```

See the [API reference](../README.md#api) in the main README for full method signatures and types, and the [tutorial](tutorial.md) for a complete walkthrough.
