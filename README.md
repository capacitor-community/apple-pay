Ionic Apple Pay handles integrating Apple Pay into your application through a single API allowing you to use Apple Pay both in a deployed native application as well as on the web on any browser that supports Apple Pay JS.

```bash
npm i @ionic-enterprise/apple-pay
```

The plugin exposes two methods, `canMakePayments` and `makePaymentRequest`.

### `canMakePayments(options: ApplePayAvailablilityOptions): Promise<{ canMakePayments: boolean }>`

Verifies that the current user is able to complete a payment using the provider accepted networks.

### `makePaymentRequest(request: ApplePayRequest): Promise<ApplePayPaymentRequestResponse>`

### Types

#### Interface - `ApplePayAvailabilityOptions`

| Name               | Type                               | Definition                            |
| ------------------ | ---------------------------------- | ------------------------------------- |
| merchantIdentifier | `string`                           | MerchantId provided by Apple          |
| supportedNetworks  | `Array<ApplePaySupportedNetworks>` | A list of supported networks accepted |

#### Interface - `ApplePaySummaryItem`

| Name   | Type                            | Definition                                                            |
| ------ | ------------------------------- | --------------------------------------------------------------------- |
| label  | `string`                        | Label describing the summary item                                     |
| amount | `string`                        | Amount for the summary item in currency format as a string. ex '1.99' |
| type   | `Optional<'pending' | 'final'>` | Used to describe if the value may still change or is final.           |

#### Interface - `ApplePayMerchantValidation`

| Name   | Type                               | Definition                                                                     |
| ------ | ---------------------------------- | ------------------------------------------------------------------------------ |
| url    | `string`                           | Defines the url used to validate merchant credentials. See #merchantValidation |
| params | `ApplePayMerchantValidationParams` | Required merchant validation params                                            |

#### Interface `ApplePayMerchantValidationParams`

| Name               | Type               | Definition                                                            |
| ------------------ | ------------------ | --------------------------------------------------------------------- |
| merchantIdentifier | `string`           | MerchantId provided by Apple                                          |
| displayName        | `string`           | Name displayed by your application to identify your merchant          |
| initiative         | `'web' | 'native'` | Identifies the transaction as coming from a mobile app or web context |
| initiativeContext  | `string`           | A value you provide based on the initiative. ex, the web url          |

#### Interface `ApplePayPaymentAuthorization`

| Name | Type     | Definition                                        |
| ---- | -------- | ------------------------------------------------- |
| url  | `string` | Defines the url used to authorize the transaction |

#### Interface `ApplePayPaymentRequest`

| Name                 | Type                                  | Definition                                                 |
| -------------------- | ------------------------------------- | ---------------------------------------------------------- |
| countryCode          | `string`                              | ISO country code for the merchant                          |
| currencyCode         | `string`                              | ISO currency code for the merchat                          |
| merchantCapabilities | `Array<ApplePayMerchantCapabilities>` | List of Capabilities supported by the merchant             |
| supportedNetworks    | `Array<ApplePaySupportedNetworks>`    | List of networks supported by the merchant                 |
| lineItems            | `Array<ApplePaySummaryItem>`          | List of items included in this transaction                 |
| total                | `ApplePaySummaryItem`                 | Single item describing the final total of this transaction |

#### Interface - `ApplePayRequest`

| Name                 | Type                           | Definition                                      |
| -------------------- | ------------------------------ | ----------------------------------------------- |
| version              | `1 | 2 | 3 | 4 | 5 `           | Define the version of Apple Pay you want to use |
| merchantValidation   | `ApplePayMerchantValidation`   | Merchant Validation params                      |
| paymentAuthorization | `ApplePayPaymentAuthorization` | Payment Authorization params                    |
| request              | `ApplePayPaymentRequest`       | Payment Request params                          |

#### Interface - `ApplePayPaymentRequestResponse`

| Name    | Type      | Definition                                                               |
| ------- | --------- | ------------------------------------------------------------------------ |
| success | `boolean` | True if the transaction completed successfully                           |
| data    | `any`     | Returns any data passed back from the server after payment authorization |

#### Enum - `LogLevel`

| Key   | Definition                       |
| ----- | -------------------------------- |
| DEBUG | Enable debug logs in the plugin  |
| ERROR | Disable debug logs in the plugin |
