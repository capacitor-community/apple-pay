import { Component } from '@angular/core';

import { Plugins, StatusBarStyle } from '@capacitor/core';

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
    const { SplashScreen, StatusBar } = Plugins;
    StatusBar.setStyle({
      style: StatusBarStyle.Dark,
    });
    SplashScreen.hide();
  }
}
