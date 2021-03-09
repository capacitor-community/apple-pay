declare module '@capacitor/core' {
  interface PluginRegistry {
    ApplePay: ApplePayPlugin;
  }
}

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
  supportedNetworks: Array<string>;
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
  lineItems: Array<ApplePaySummaryItem>;
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
