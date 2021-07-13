import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import {
  ApplePayMerchantCapabilities,
  ApplePaySummaryItem,
  ApplePaySupportedNetworks,
} from '@ionic-enterprise/apple-pay';
import { PaymentsService } from './payments.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private payments: PaymentsService) {}

  async isAvailable(): Promise<void> {
    const res = await this.payments.isAvailable();
    console.log('is available', res);
  }

  async paymentTest(): Promise<void> {
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
    const res = await this.payments.makePayment(items, total);
    console.log('payment test', res);
  }
}
