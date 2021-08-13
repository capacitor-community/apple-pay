import { WebPlugin, registerPlugin } from '@capacitor/core';

import { onPaymentAuthorized, onValidateMerchant } from './apple-pay-js-events';
import { ApplePayErrorCodes, getApplePayError, LogLevel } from './definitions';
import type {
  ApplePayAvailabilityOptions,
  ApplePayCanMakePaymentResponse,
  ApplePayPaymentRequestResponse,
  ApplePayPlugin,
  ApplePayRequest,
} from './definitions';
import { Logger } from './logger';

interface ApplePayJS {
  canMakePayments: () => boolean;
  canMakePaymentsWithActiveCard: (
    merchantIdentifier: string,
  ) => Promise<boolean>;
  [key: string]: any;
}

const logger = Logger.instance();

export class ApplePayWeb extends WebPlugin implements ApplePayPlugin {
  /** @ignore */
  private get ApplePaySession(): ApplePayJS {
    return (window as any).ApplePaySession;
  }

  /** @ignore */
  constructor() {
    super();
  }

  setLogLevel(level: LogLevel): void {
    logger.enabled = level === LogLevel.DEBUG;
  }

  async canMakePayments(
    options: ApplePayAvailabilityOptions,
  ): Promise<ApplePayCanMakePaymentResponse> {
    try {
      this.checkApplePayJSAvailable();
      return {
        canMakePayments:
          await this.ApplePaySession.canMakePaymentsWithActiveCard(
            options.merchantIdentifier,
          ),
      };
    } catch (e) {
      logger.error('can make payments error', e);
      return {
        canMakePayments: false,
      };
    }
  }

  async makePaymentRequest(
    options: ApplePayRequest,
  ): Promise<ApplePayPaymentRequestResponse> {
    const isAvailable = this.checkApplePayJSAvailable();

    if (!isAvailable) {
      throw getApplePayError(ApplePayErrorCodes.ApplePayNotAvailable);
    }

    return new Promise<ApplePayPaymentRequestResponse>((resolve, reject) => {
      let session: any;
      try {
        session = new (window as any).ApplePaySession(
          options.version,
          options.request,
        );
        logger.log('Apple Pay Session created');
      } catch (e) {
        logger.error('begin session error', e);
        reject(
          getApplePayError(ApplePayErrorCodes.ApplePayUnableToOpenSession, e),
        );
        return;
      }

      session.onvalidatemerchant = onValidateMerchant(
        options.merchantValidation,
        {
          onSuccess: res => {
            logger.log('merchant validation complete', res);
            session.completeMerchantValidation(res);
          },
          onError: err => {
            logger.error('merchant validation error', err);
            session.abort();
            reject(
              getApplePayError(
                ApplePayErrorCodes.ApplePayMerchantValidationFailed,
                err,
              ),
            );
          },
        },
      );

      session.onpaymentauthorized = onPaymentAuthorized(
        options.paymentAuthorization,
        options.request,
        {
          onSuccess: res => {
            logger.log('paymment authorization success', res);
            session.completePayment({
              status: this.ApplePaySession.STATUS_SUCCESS,
            });
            resolve({
              success: true,
              data: res,
            });
          },
          onError: err => {
            logger.error('payment authorization failed', err);
            session.completePayment({
              status: this.ApplePaySession.STATUS_FAILURE,
            });
            reject(
              getApplePayError(
                ApplePayErrorCodes.ApplePayAuthorizationFailed,
                err,
              ),
            );
          },
        },
      );

      session.oncancel = (event: any) => {
        logger.error('canceled', event);
        reject(getApplePayError(ApplePayErrorCodes.ApplePayCanceled));
      };

      session.begin();
    });
  }

  /** @ignore */
  private checkApplePayJSAvailable(): boolean {
    if (this.ApplePaySession) {
      logger.log('Apple Pay JS available');
      return true;
    }

    logger.error('Apple Pay JS not available');
    return false;
  }
}
const ApplePayImpl = registerPlugin<ApplePayPlugin>('ApplePay', {
  web: () => import('./web').then(m => new m.ApplePayWeb()),
});

export { ApplePayImpl };
