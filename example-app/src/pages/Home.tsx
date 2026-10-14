import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import './Home.css';
import {
  ApplePay,
  ApplePayMerchantCapability,
  ApplePaySummaryItem,
  ApplePaySupportedNetwork,
  ApplePayErrorCodes,
} from '@ionic-enterprise/apple-pay';

const Home: React.FC = () => {

  const paymentTestConfig: {
    merchantIdentifier: string;
    supportedNetworks: ApplePaySupportedNetwork[];
    merchantCapabilties: ApplePayMerchantCapability[];
    countryCode: string;
    currencyCode: string;
    merchantValidationUrl: string;
    authorizationUrl: string;
  } = {
    merchantIdentifier: 'REPLACE_WITH_MERCHANT_IDENTIFIER',
    supportedNetworks: [
      ApplePaySupportedNetwork.VISA,
      ApplePaySupportedNetwork.MASTERCARD,
      ApplePaySupportedNetwork.AMEX,
      ApplePaySupportedNetwork.DISCOVER,
    ],
    merchantCapabilties: [
      ApplePayMerchantCapability.DEBIT,
      ApplePayMerchantCapability.CREDIT,
      ApplePayMerchantCapability.THREEDS,
    ],
    countryCode: 'US',
    currencyCode: 'USD',
    merchantValidationUrl: 'REPLACE_WITH_MERCHANT_VALIDATION_URL',
    authorizationUrl: 'REPLACE_WITH_AUTHORIZATION_URL'
  }

  const isAvailable = async (): Promise<boolean> => {
    const { canMakePayments } = await ApplePay.canMakePayments({
      merchantIdentifier: paymentTestConfig.merchantIdentifier,
      supportedNetworks: paymentTestConfig.supportedNetworks,
    });
    return canMakePayments;
  }

  const makePayment = async (items: ApplePaySummaryItem[], total: ApplePaySummaryItem) => {
    const { success } = await ApplePay.makePaymentRequest({
      version: 5,
      merchantValidation: {
        url: paymentTestConfig.merchantValidationUrl,
        params: {
          merchantIdentifier: paymentTestConfig.merchantIdentifier,
          displayName: 'REPLACE_WITH_DISPLAY_NAME',
          initiative: 'web',
          initiativeContext: 'REPLACE_WITH_INITIATIVE_CONTEXT',
        },
      },
      paymentAuthorization: {
        url: paymentTestConfig.authorizationUrl,
      },
      request: {
        countryCode: paymentTestConfig.countryCode,
        currencyCode: paymentTestConfig.currencyCode,
        merchantCapabilities: paymentTestConfig.merchantCapabilties,
        supportedNetworks: paymentTestConfig.supportedNetworks,
        lineItems: items,
        total,
      },
    });
    return success;
  }

  const paymentTest = async (): Promise<void> => {
    try {
      const items: ApplePaySummaryItem[] = new Array(5)
        .fill(null)
        .map((_, idx) => ({
          amount: '1.00',
          label: `Item ${idx}`,
        }));
      const total: ApplePaySummaryItem = {
        amount: '5.00',
        label: 'Total',
        type: 'final',
      };
      const res = await makePayment(items, total);
      console.log('payment test', res);
    } catch (err: any) {
      switch (err.code) {
        case ApplePayErrorCodes.UserCanceled:
          console.log('user canceled the transaction');
          break;
        default:
          console.error(err);
      }
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <div id="container">
          <IonButton color="primary" onClick={isAvailable}>Check Availability</IonButton>
          <IonButton color="success" onClick={paymentTest}>Payment Request Test</IonButton>
          <div className="apple-pay-button apple-pay-button-white"></div>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Home;
