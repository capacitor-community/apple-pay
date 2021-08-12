import {
  LogLevel,
  ApplePayAvailabilityOptions,
  ApplePayCanMakePaymentResponse,
  ApplePayRequest,
  ApplePayPaymentRequestResponse,
} from './definitions';

import { ApplePayImpl } from './web';

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
  public static canMakePayments(
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
  public static makePaymentRequest(
    options: ApplePayRequest,
  ): Promise<ApplePayPaymentRequestResponse> {
    return ApplePayImpl.makePaymentRequest(options);
  }
}
