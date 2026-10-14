import {
  performApplePayAuthorization,
  performValidation,
} from './apple-pay-js-api';
import type {
  ApplePayMerchantValidation,
  ApplePayPaymentAuthorization,
  ApplePayPaymentRequest,
} from './definitions';

interface ValidateActions {
  onSuccess: (res: any) => void;
  onError: (error: any) => void;
}

export function onValidateMerchant(
  merchantValidation: ApplePayMerchantValidation,
  actions: ValidateActions,
): (event: { validationURL: string }) => void {
  return async event => {
    try {
      const apiResult = await performValidation(
        event.validationURL,
        merchantValidation,
      );
      actions.onSuccess(apiResult);
    } catch (e) {
      actions.onError(e);
    }
  };
}

export function onPaymentAuthorized(
  paymentAuthorization: ApplePayPaymentAuthorization,
  request: ApplePayPaymentRequest,
  actions: ValidateActions,
): (event: { payment: { token: any } }) => void {
  return async event => {
    try {
      const apiResult = await performApplePayAuthorization(
        paymentAuthorization,
        request,
        event.payment.token,
      );
      actions.onSuccess(apiResult);
    } catch (e) {
      actions.onError(e);
    }
  };
}
