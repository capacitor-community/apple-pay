<p align="center"><br><img src="https://user-images.githubusercontent.com/236501/85893648-1c92e880-b7a8-11ea-926d-95355b8175c7.png" width="128" height="128" /></p>
<h3 align="center">Apple Pay</h3>
<p align="center"><strong><code>@capacitor-community/apple-pay</code></strong></p>
<p align="center">
  Capacitor Plugin used to enable Apple Pay in an Application
</p>

<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2026?style=flat-square" />
  <a href="https://www.npmjs.com/package/@capacitor-community/apple-pay"><img src="https://img.shields.io/npm/l/@capacitor-community/apple-pay?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/@capacitor-community/apple-pay"><img src="https://img.shields.io/npm/v/@capacitor-community/apple-pay?style=flat-square" /></a>
</p>

## Maintainers

| Maintainer | GitHub | Social |
| -----------| -------| -------|
| Capacitor Community | [capacitor-community](https://github.com/capacitor-community) | |

## Installation

```bash
npm install @capacitor-community/apple-pay
npx cap sync
```

## Demo

A working example can be found in the [example-app](./example-app) directory.

## API

<docgen-index>

* [`setLogLevel(...)`](#setloglevel)
* [`canMakePayments(...)`](#canmakepayments)
* [`makePaymentRequest(...)`](#makepaymentrequest)
* [Interfaces](#interfaces)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### setLogLevel(...)

```typescript
setLogLevel(level: LogLevel) => void
```

Set the verbosity of event logging.

| Param       | Type                                          |
| ----------- | --------------------------------------------- |
| **`level`** | <code><a href="#loglevel">LogLevel</a></code> |

--------------------


### canMakePayments(...)

```typescript
canMakePayments(options: ApplePayAvailabilityOptions) => Promise<ApplePayCanMakePaymentsResponse>
```

Checks if the device supports Apple Pay and can make payments, based on the supplied options.

| Param         | Type                                                                                |
| ------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#applepayavailabilityoptions">ApplePayAvailabilityOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#applepaycanmakepaymentsresponse">ApplePayCanMakePaymentsResponse</a>&gt;</code>

--------------------


### makePaymentRequest(...)

```typescript
makePaymentRequest(request: ApplePayRequest) => Promise<ApplePayPaymentRequestResponse>
```

Attempts to make request payment by presenting the payment sheet over the app.

| Param         | Type                                                        |
| ------------- | ----------------------------------------------------------- |
| **`request`** | <code><a href="#applepayrequest">ApplePayRequest</a></code> |

**Returns:** <code>Promise&lt;<a href="#applepaypaymentrequestresponse">ApplePayPaymentRequestResponse</a>&gt;</code>

--------------------


### Interfaces


#### ApplePayCanMakePaymentsResponse

The response object from {@link ApplePay.canMakePayments}

| Prop                  | Type                 | Description                                                    |
| --------------------- | -------------------- | -------------------------------------------------------------- |
| **`canMakePayments`** | <code>boolean</code> | - Type: `boolean` Whether or not the device can make payments. |


#### ApplePayAvailabilityOptions

A config object for {@link ApplePay.canMakePayments}

| Prop                     | Type                                    | Description                                                                                                                             |
| ------------------------ | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **`merchantIdentifier`** | <code>string</code>                     | - Type: `string` The merchant identifier you registered with Apple for use with Apple Pay.                                              |
| **`supportedNetworks`**  | <code>ApplePaySupportedNetwork[]</code> | - Type: {@link <a href="#applepaysupportednetwork">ApplePaySupportedNetwork</a>} An array of supported networks that will be supported. |


#### ApplePayPaymentRequestResponse

The response object from {@link ApplePay.makePaymentRequest}

| Prop          | Type                 | Description                                                          |
| ------------- | -------------------- | -------------------------------------------------------------------- |
| **`success`** | <code>boolean</code> | - Type: `boolean` Whether or not the payment request was successful. |
| **`data`**    | <code>any</code>     | - Type: `any` The data response from the merchant validation server. |


#### ApplePayRequest

| Prop                       | Type                                                                                  | Description                                                                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`version`**              | <code>1 \| 2 \| 5 \| 4 \| 3</code>                                                    | - Type: `1` \| `2` \| `3` \| `4` \| `5` The version of Apple Pay the app supports.                                                                     |
| **`merchantValidation`**   | <code><a href="#applepaymerchantvalidation">ApplePayMerchantValidation</a></code>     | - Type: {@link <a href="#applepaymerchantvalidation">ApplePayMerchantValidation</a>} An object containing merchant validation settings.                |
| **`paymentAuthorization`** | <code><a href="#applepaypaymentauthorization">ApplePayPaymentAuthorization</a></code> | - Type: {@link <a href="#applepaypaymentauthorization">ApplePayPaymentAuthorization</a>} An object containing merchant payment authorization settings. |
| **`request`**              | <code><a href="#applepaypaymentrequest">ApplePayPaymentRequest</a></code>             | - Type: {@link <a href="#applepaypaymentrequest">ApplePayPaymentRequest</a>} The payment request object.                                               |


#### ApplePayMerchantValidation

An object containing settings for connecting with your merchant validation server.

| Prop         | Type                                                                                          | Description                                                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`url`**    | <code>string</code>                                                                           | - Type: `string` The url to your merchant validation server. If your application will only be used natively then this value can be set to `undefined`.                        |
| **`params`** | <code><a href="#applepaymerchantvalidationparams">ApplePayMerchantValidationParams</a></code> | - Type: {@link <a href="#applepaymerchantvalidationparams">ApplePayMerchantValidationParams</a>} Additional params that will be POSTed to the the merchant validation server. |


#### ApplePayMerchantValidationParams

An object containing request parameters for server-side merchant validation.

| Prop                     | Type                           | Description                                                                                                                          |
| ------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| **`merchantIdentifier`** | <code>string</code>            | - Type: `string` The merchant identifier you registered with Apple for use with Apple Pay.                                           |
| **`displayName`**        | <code>string</code>            | - Type: `string` The display name of your store, UTF-8, unlocalized, with a max length of 64 characters.                             |
| **`initiative`**         | <code>'web' \| 'native'</code> | - Type: `web` The type of the app making the request. This value should be set to `web`. It is ignored when run natively.            |
| **`initiativeContext`**  | <code>string</code>            | - Type: `string` This value should be your fully qualified domain name associated with your Apple Pay Merchant Identity Certificate. |


#### ApplePayPaymentAuthorization

An object containing settings for connecting with your merchant payment authorization server.

| Prop      | Type                | Description                                                             |
| --------- | ------------------- | ----------------------------------------------------------------------- |
| **`url`** | <code>string</code> | - Type: `string` The url to your merchant payment authorization server. |


#### ApplePayPaymentRequest

An object describing the payment request, including information about payment processing capabilities, payment amounts and more.

| Prop                       | Type                                                                | Description                                                                                                                                                      |
| -------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`countryCode`**          | <code>string</code>                                                 | - Type: `string` The merchant’s two-letter ISO 3166 country code.                                                                                                |
| **`currencyCode`**         | <code>string</code>                                                 | - Type: `string` The three-letter ISO 4217 currency code for the payment.                                                                                        |
| **`merchantCapabilities`** | <code>ApplePayMerchantCapability[]</code>                           | - Type: {@link <a href="#applepaymerchantcapability">ApplePayMerchantCapability</a>} The payment capabilities supported by the merchant.                         |
| **`supportedNetworks`**    | <code>ApplePaySupportedNetwork[]</code>                             | - Type: {@link <a href="#applepaysupportednetwork">ApplePaySupportedNetwork</a>} The payment networks the merchant supports.                                     |
| **`lineItems`**            | <code>ApplePaySummaryItem[]</code>                                  | - Type: {@link <a href="#applepaysummaryitem">ApplePaySummaryItem</a>} A set of line items that explain recurring payments and additional charges and discounts. |
| **`total`**                | <code><a href="#applepaysummaryitem">ApplePaySummaryItem</a></code> | - Type: {@link <a href="#applepaysummaryitem">ApplePaySummaryItem</a>} A line item representing the total for the payment.                                       |


#### ApplePaySummaryItem

An object that defines a line item in a payment request.

| Prop         | Type                              | Description                                                                                                              | Default                  |
| ------------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| **`label`**  | <code>string</code>               | - Type: `string` The name of the line item (ex.: product name).                                                          |                          |
| **`amount`** | <code>string</code>               | - Type: `string` The line item amount.                                                                                   |                          |
| **`type`**   | <code>'pending' \| 'final'</code> | - Type: `pending` \| `final` Whether or not the line item represents a known final cost or an estimated or unknown cost. | <code>`undefined`</code> |


### Enums


#### LogLevel

| Members     | Description                                       |
| ----------- | ------------------------------------------------- |
| **`DEBUG`** | Log events that may be useful during development. |
| **`ERROR`** | Only log errors.                                  |


#### ApplePaySupportedNetwork

| Members               | Value                          | Description                                |
| --------------------- | ------------------------------ | ------------------------------------------ |
| **`AMEX`**            | <code>'amex'</code>            | American Express                           |
| **`CARTESBANCAIRES`** | <code>'cartesBancaires'</code> | Cartes Bancaires                           |
| **`CHINAUNIONPAY`**   | <code>'chinaUnionPay'</code>   | China Union Pay                            |
| **`DISCOVER`**        | <code>'discover'</code>        | Discover Card                              |
| **`EFTPOS`**          | <code>'eftpos'</code>          | Electronic funds transfer at point of sale |
| **`ELECTRON`**        | <code>'electron'</code>        | Visa Electron                              |
| **`ELO`**             | <code>'elo'</code>             | Elo                                        |
| **`INTERAC`**         | <code>'interac'</code>         | Interac                                    |
| **`JCB`**             | <code>'jcb'</code>             | Japan Credit Bureau                        |
| **`MADA`**            | <code>'mada'</code>            | Saudi Payments Network                     |
| **`MAESTRO`**         | <code>'maestro'</code>         | Maestro Debit Card                         |
| **`MASTERCARD`**      | <code>'masterCard'</code>      | Mastercard                                 |
| **`PRIVATELABEL`**    | <code>'privateLabel'</code>    | Store credit and debit cards               |
| **`VISA`**            | <code>'visa'</code>            | Visa                                       |
| **`VPAY`**            | <code>'vPay'</code>            | Visa vPay                                  |


#### ApplePayMerchantCapability

| Members       | Value                         | Description                    |
| ------------- | ----------------------------- | ------------------------------ |
| **`THREEDS`** | <code>'supports3DS'</code>    | Support the 3D Secure protocol |
| **`DEBIT`**   | <code>'supportsDebit'</code>  | Support for debit cards        |
| **`CREDIT`**  | <code>'supportsCredit'</code> | Support for credit cards       |
| **`EMV`**     | <code>'supportsEMV'</code>    | Support for the EMV protocol   |

</docgen-api>
