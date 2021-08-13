/** Options for setting the verbosity of console logging. */
export enum LogLevel {
  /** Log events that may be useful during development. */
  DEBUG,
  /** Only log errors. */
  ERROR,
}

/** Possible payment processing protocols and card types that you can accept through Apple Pay. */
export enum ApplePayMerchantCapability {
  /** Support the 3D Secure protocol */
  THREEDS = 'supports3DS',
  /** Support for debit cards */
  DEBIT = 'supportsDebit',
  /** Support for credit cards */
  CREDIT = 'supportsCredit',
  /** Support for the EMV protocol */
  EMV = 'supportsEMV',
}

/**
 * The possible payment networks that you can accept through Apple Pay.
 */
export enum ApplePaySupportedNetwork {
  /** American Express */
  AMEX = 'amex',
  /** Cartes Bancaires */
  CARTESBANCAIRES = 'cartesBancaires',
  /** China Union Pay */
  CHINAUNIONPAY = 'chinaUnionPay',
  /** Discover Card */
  DISCOVER = 'discover',
  /** Electronic funds transfer at point of sale */
  EFTPOS = 'eftpos',
  /** Visa Electron */
  ELECTRON = 'electron',
  /** Elo */
  ELO = 'elo',
  /** Interac */
  INTERAC = 'interac',
  /** Japan Credit Bureau */
  JCB = 'jcb',
  /** Saudi Payments Network */
  MADA = 'mada',
  /** Maestro Debit Card */
  MAESTRO = 'maestro',
  /** Mastercard */
  MASTERCARD = 'masterCard',
  /** Store credit and debit cards */
  PRIVATELABEL = 'privateLabel',
  /** Visa */
  VISA = 'visa',
  /** Visa vPay */
  VPAY = 'vPay',
}

/** A config object for {@link ApplePay.canMakePayments}  */
export interface ApplePayAvailabilityOptions {
  /**
   * - Type: `string`
   *
   * The merchant identifier you registered with Apple for use with Apple Pay.
   */
  merchantIdentifier: string;
  /**
   * - Type: {@link ApplePaySupportedNetwork}
   *
   * An array of supported networks that will be supported.
   */
  supportedNetworks: ApplePaySupportedNetwork[];
}

/** An object that defines a line item in a payment request. */
export interface ApplePaySummaryItem {
  /**
   * - Type: `string`
   *
   * The name of the line item (ex.: product name).
   */
  label: string;
  /**
   * - Type: `string`
   *
   * The line item amount.
   */
  amount: string;
  /**
   * - Type: `pending` | `final`
   *
   * Whether or not the line item represents a known final cost or an estimated or unknown cost.
   *
   * @default `undefined`
   */
  type?: 'pending' | 'final';
}

/**
 * An object containing request parameters for server-side merchant validation.
 */
export interface ApplePayMerchantValidationParams {
  /**
   * - Type: `string`
   *
   * The merchant identifier you registered with Apple for use with Apple Pay.
   */
  merchantIdentifier: string;

  /**
   * - Type: `string`
   *
   * The display name of your store, UTF-8, unlocalized, with a max length of 64 characters.
   */
  displayName: string;
  /**
   * - Type: `web` | `native`
   *
   * The type of the app making the request.
   *
   * The values for initiative and initiativeContext depend on the kind of application you’re building:
   * - For Apple Pay on the web, use "web" for the initiative parameter. For the initiativeContext parameter, provide your fully qualified domain name associated with your Apple Pay Merchant Identity Certificate.
   */
  initiative: 'web' | 'native';

  /**
   * - Type: `string`
   *
   * A value you provide based on the initiative.
   */
  initiativeContext: string;
}

/**
 * An object containing settings for connecting with your merchant validation server.
 */
export interface ApplePayMerchantValidation {
  /**
   * - Type: `string`
   *
   * The url to your merchant validation server. */
  url: string;

  /**
   * - Type: {@link ApplePayMerchantValidationParams}
   *
   * Additional params that will be POSTed to the the merchant validation server. */
  params: ApplePayMerchantValidationParams;
}

/**
 * An object containing settings for connecting with your merchant payment authorization server.
 */
export interface ApplePayPaymentAuthorization {
  /**
   * - Type: `string`
   *
   * The url to your merchant payment authorization server.
   */
  url: string;
}

/**
 * An object describing the payment request, including information about payment processing capabilities, payment amounts and more.
 */
export interface ApplePayPaymentRequest {
  /**
   * - Type: `string`
   *
   * The merchant’s two-letter ISO 3166 country code.
   */
  countryCode: string;

  /**
   * - Type: `string`
   *
   * The three-letter ISO 4217 currency code for the payment.
   */
  currencyCode: string;

  /**
   * - Type: {@link ApplePayMerchantCapability}
   *
   * The payment capabilities supported by the merchant.
   */
  merchantCapabilities: ApplePayMerchantCapability[];

  /**
   * - Type: {@link ApplePaySupportedNetwork}
   *
   * The payment networks the merchant supports.
   */
  supportedNetworks: ApplePaySupportedNetwork[];

  /**
   * - Type: {@link ApplePaySummaryItem}
   *
   * A set of line items that explain recurring payments and additional charges and discounts.
   */
  lineItems: ApplePaySummaryItem[];

  /**
   * - Type: {@link ApplePaySummaryItem}
   *
   * A line item representing the total for the payment.
   */
  total: ApplePaySummaryItem;
}

export interface ApplePayRequest {
  /**
   * - Type: `1` | `2` | `3` | `4` | `5`
   *
   * The version of Apple Pay the app supports.
   */
  version: 1 | 2 | 3 | 4 | 5;

  /**
   * - Type: {@link ApplePayMerchantValidation}
   *
   * An object containing merchant validation settings.
   */
  merchantValidation: ApplePayMerchantValidation;

  /**
   * - Type: {@link ApplePayPaymentAuthorization}
   *
   * An object containing merchant payment authorization settings.
   */
  paymentAuthorization: ApplePayPaymentAuthorization;

  /**
   * - Type: {@link ApplePayPaymentRequest}
   *
   * The payment request object.
   */
  request: ApplePayPaymentRequest;
}

/** The response object from {@link ApplePay.makePaymentRequest} */
export interface ApplePayPaymentRequestResponse {
  /**
   * - Type: `boolean`
   *
   * Whether or not the payment request was successful. */
  success: boolean;

  /**
   * - Type: `any`
   *
   * The data response from the merchant validation server. */
  data?: any;
}

/** The response object from {@link ApplePay.canMakePayments} */
export interface ApplePayCanMakePaymentResponse {
  /**
   * - Type: `boolean`
   *
   * Whether or not the device can make payments.
   */
  canMakePayments: boolean;
}

export interface ApplePayPlugin {
  /**
   * Set the verbosity of event logging.
   */
  setLogLevel: (level: LogLevel) => void;

  /**
   *
   * Checks if the device supports Apple Pay and can make payments, based on the supplied options.
   *
   * @usage
   * ```typescript
   * const { canMakePayments } = await ApplePay.canMakePayments({
   *  merchantIdentifier: merchantIdentifier,
   *  supportedNetworks: supportedNetworks,
   * });
   * if (canMakePayments) {
   *  // start building a payment request...
   * }
   * ```
   */
  canMakePayments: (
    options: ApplePayAvailabilityOptions,
  ) => Promise<ApplePayCanMakePaymentResponse>;

  /**
   * Attempts to make request payment by presenting the payment sheet over the app.
   *
   * @usage
   * ```typescript
   * const request: ApplePayRequest = {...}
   * const { success } = await ApplePay.makePaymentRequest(request);
   * if (success) {
   *  alert("Payment successful!");
   * }
   * ```
   */
  makePaymentRequest: (
    request: ApplePayRequest,
  ) => Promise<ApplePayPaymentRequestResponse>;
}

export enum ApplePayErrorCodes {
  /**
   * An unknown error happened.
   * @constant `0`
   */
  Unknown,
  /**
   * Apple Pay is not enabled on this device.
   * @constant `1`
   */
  ApplePayNotAvailable,
  /**
   * A failure occurred while trying to start an ApplePayJS session.
   * @constant `2`
   */
  ApplePayUnableToOpenSession,
  /**
   * A failure occurred during merchant validation.
   * @constant `3`
   */
  ApplePayMerchantValidationFailed,
  /**
   * A failure occurred during payment authorization.
   * @constant `4`
   */
  ApplePayAuthorizationFailed,
  /**
   * The user canceled the payment request.
   * @constant `5`
   */
  ApplePayCanceled,
}

/** An error that can be thrown by the plugin. */
export interface ApplePayError {
  /**
   * - Type: `string`
   *
   * A text description of the error that occurred.
   */
  message: string;
  /**
   * - Type: {@link ApplePayErrorCodes}
   *
   * The error code enum representing the error.
   */
  code: ApplePayErrorCodes;
}

/** @ignore */
export function getApplePayError(
  code: ApplePayErrorCodes,
  error?: Error,
): ApplePayError {
  let message = '';
  switch (code) {
    case ApplePayErrorCodes.ApplePayNotAvailable:
      message =
        'Apple Pay JS is not available. Check that your domain has been correctly validated, has the correct certificates, and that you are running on a compatible iOS device';
      break;
    case ApplePayErrorCodes.ApplePayUnableToOpenSession:
      message = 'Unable to open new Apple Pay Session';
      break;
    case ApplePayErrorCodes.ApplePayMerchantValidationFailed:
      message = 'Merchant validation failed';
      break;
    case ApplePayErrorCodes.ApplePayAuthorizationFailed:
      message = 'Payment authorization failed';
      break;
    case ApplePayErrorCodes.ApplePayCanceled:
      message = 'User Canceled';
      break;
    default:
      message = `Unhandled Error: ${error?.message}`;
      break;
  }
  return {
    message,
    code,
  };
}
