---
title: Installation
sidebar_label: Installation
---

import NativeEnterpriseInstall from '@site/src/components/NativeEnterpriseInstall';

__Don't have an Apple Pay subscription?__ [Try it free now](http://dashboard.ionicframework.com/personal/apps?native_trial=1).

Follow these steps to install Apple Pay into your app.

> Apple Pay plugin is only available for projects running Capacitor 3 or later.

```bash
npm install @ionic-enterprise/apple-pay
npx cap sync
```

## Getting Started

Integrating with your application only requires two basic API calls. First, check if the user is running a device capable of using Apple Pay in the current context by calling the [canMakePayments](classes/applepay.md#canmakepayments) method, then make the payment request using [makePaymentRequest](classes/applepay.md#makepaymentrequest).

```typescript

await ApplePay.canMakePayments({});
await ApplePay.makePaymentRequest({});
```

Additional information can found in the [tutorial](tutorial).