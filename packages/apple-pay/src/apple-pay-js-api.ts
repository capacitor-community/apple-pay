import {
  ApplePayMerchantValidation,
  ApplePayPaymentAuthorization,
  ApplePayPaymentRequest,
} from './definitions';
import { Logger } from './logger';

const logger = Logger.instance();

const post = async (path: string, data: any, errorMessage: string) => {
  try {
    const rawResponse = await fetch(path, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (rawResponse.status >= 200 && rawResponse.status < 300) {
      return rawResponse.json();
    } else {
      throw new Error(errorMessage);
    }
  } catch (error) {
    logger.error('POST error:', error);
    throw new Error(errorMessage);
  }
};

export const performValidation = (
  validationUrl: string,
  validationData: ApplePayMerchantValidation,
) => {
  const data = {
    validationUrl:
      validationUrl ??
      `missing url ${typeof validationUrl} // ${JSON.stringify(validationUrl)}`,
    body: validationData.params,
  };
  return post(validationData.url, data, 'Could not complete validation');
};

export const performApplePayAuthorization = (
  authorization: ApplePayPaymentAuthorization,
  request: ApplePayPaymentRequest,
  token: any,
) => {
  const data = {
    request,
    token,
  };
  return post(
    authorization.url,
    data,
    'Could not complete authorization transaction',
  );
};
