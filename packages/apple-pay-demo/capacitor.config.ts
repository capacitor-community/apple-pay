import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.dallastjames.ionic.applepaydemo',
    appName: 'apple-pay-demo',
    bundledWebRuntime: false,
    webDir: 'www',
    plugins: {
        SplashScreen: {
            launchShowDuration: 0
        }
    },
    cordova: {}
};

export default config;
