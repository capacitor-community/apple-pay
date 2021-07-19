import { Component } from '@angular/core';

import { StatusBar, Style } from '@capacitor/status-bar';
import {SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.initializeApp();
  }

  initializeApp() {
    StatusBar.setStyle({
      style: Style.Dark,
    });
    SplashScreen.hide();
  }
}
