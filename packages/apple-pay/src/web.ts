import { WebPlugin } from '@capacitor/core';
import {
  ApplePayAvailabilityOptions,
  ApplePayCanMakePaymentResponse,
  ApplePayPaymentRequestResponse,
  ApplePayPlugin,
  ApplePayRequest,
  LogLevel,
} from './definitions';
import { onPaymentAuthorized, onValidateMerchant } from './apple-pay-js-events';
import {
  APPLE_PAY_CANCELED,
  APPLE_PAY_MERCHANT_VALIDATION_FAILED,
  APPLE_PAY_NOT_AVAILABLE,
  APPLE_PAY_PAYMENT_AUTHORIZATION_FAILED,
  APPLE_PAY_UNABLE_TO_OPEN_SESSION,
} from './messages';
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
    this.checkApplePayJSAvailable();
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
        reject(APPLE_PAY_UNABLE_TO_OPEN_SESSION);
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
            reject(APPLE_PAY_MERCHANT_VALIDATION_FAILED);
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
            reject(APPLE_PAY_PAYMENT_AUTHORIZATION_FAILED);
          },
        },
      );

      session.oncancel = (event: any) => {
        logger.error('canceled', event);
        reject(APPLE_PAY_CANCELED);
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
    throw new Error(APPLE_PAY_NOT_AVAILABLE);
  }
}

import { registerPlugin } from '@capacitor/core';
const ApplePayImpl = registerPlugin<ApplePayPlugin>('ApplePay', {
  web: () => import('./web').then(m => new m.ApplePayWeb()),
});

export { ApplePayImpl };
