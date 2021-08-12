import {
  ApplePayAvailabilityOptions,
  ApplePayCanMakePaymentResponse,
  ApplePayPaymentRequestResponse,
  ApplePayPlugin,
  ApplePayRequest,
  LogLevel,
} from './definitions';

import { registerPlugin } from '@capacitor/core';

export {
  LogLevel,
  ApplePayMerchantCapability,
  ApplePaySupportedNetwork,
  ApplePayAvailabilityOptions,
  ApplePaySummaryItem,
  ApplePayMerchantValidationParams,
  ApplePayMerchantValidation,
  ApplePayPaymentAuthorization,
  ApplePayPaymentRequest,
  ApplePayRequest,
  ApplePayPaymentRequestResponse,
  ApplePayCanMakePaymentResponse,
} from './definitions';

const ApplePayImpl = registerPlugin<ApplePayPlugin>('ApplePay', {
  web: () => import('./web').then(m => new m.ApplePayWeb()),
});

export class ApplePay {
  /** @ignore */
  constructor() {}
  /**
   * Set the verbosity of event logging.
   */
  public static setLogLevel(level: LogLevel): void {
    return ApplePayImpl.setLogLevel(level);
  }

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
  canMakePayments(
    options: ApplePayAvailabilityOptions,
  ): Promise<ApplePayCanMakePaymentResponse> {
    return ApplePayImpl.canMakePayments(options);
  }

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
  async makePaymentRequest(
    options: ApplePayRequest,
  ): Promise<ApplePayPaymentRequestResponse> {
    return ApplePayImpl.makePaymentRequest(options);
  }
}
