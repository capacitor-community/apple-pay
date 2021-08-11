export enum LogLevel {
  DEBUG,
  ERROR,
}

export enum ApplePayMerchantCapabilities {
  THREEDS = 'supports3DS',
  DEBIT = 'supportsDebit',
  CREDIT = 'supportsCredit',
  EMV = 'supportsEMV',
}

export enum ApplePaySupportedNetworks {
  AMEX = 'amex',
  CARTESBANCAIRES = 'cartesBancaires',
  CHINAUNIONPAY = 'chinaUnionPay',
  DISCOVER = 'discover',
  EFTPOS = 'eftpos',
  ELECTRON = 'electron',
  ELO = 'elo',
  INTERAC = 'interac',
  JCB = 'jcb',
  MADA = 'mada',
  MAESTRO = 'maestro',
  MASTERCARD = 'masterCard',
  PRIVATELABEL = 'privateLabel',
  VISA = 'visa',
  VPAY = 'vPay',
}

export interface ApplePayAvailablilityOptions {
  merchantIdentifier: string;
  supportedNetworks: string[];
}

export interface ApplePaySummaryItem {
  label: string;
  amount: string;
  type?: 'pending' | 'final';
}

export interface ApplePayMerchantValidationParams {
  merchantIdentifier: string;
  displayName: string;
  initiative: 'web' | 'native';
  initiativeContext: string;
}

export interface ApplePayMerchantValidation {
  url: string;
  params: ApplePayMerchantValidationParams;
}

export interface ApplePayPaymentAuthorization {
  url: string;
}

export interface ApplePayPaymentRequest {
  countryCode: string;
  currencyCode: string;
  merchantCapabilities: ApplePayMerchantCapabilities[];
  supportedNetworks: ApplePaySupportedNetworks[];
  lineItems: ApplePaySummaryItem[];
  total: ApplePaySummaryItem;
}

export interface ApplePayRequest {
  version: 1 | 2 | 3 | 4 | 5;
  merchantValidation: ApplePayMerchantValidation;
  paymentAuthorization: ApplePayPaymentAuthorization;
  request: ApplePayPaymentRequest;
}

export interface ApplePayPaymentRequestResponse {
  success: boolean;
  data?: any;
}

export interface ApplePayPlugin {
  setLogLevel: (level: LogLevel) => void;
  canMakePayments: (
    options: ApplePayAvailablilityOptions,
  ) => Promise<{ canMakePayments: boolean }>;
  makePaymentRequest: (
    request: ApplePayRequest,
  ) => Promise<ApplePayPaymentRequestResponse>;
}

export enum ApplePayErrorCodes {
  Unknown,
  ApplePayNotAvailable,
  ApplePayUnableToOpenSession,
  ApplePayMerchantValidationFailed,
  ApplePayAuthorizationFailed,
  ApplePayCanceled,
}

export interface ApplePayError {
  message: string;
  code: ApplePayErrorCodes;
}

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
