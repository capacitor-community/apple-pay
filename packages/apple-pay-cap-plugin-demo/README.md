# Apple Pay Demo Application

This is a simple demo application used to show how to implement the Capacitor Apple Pay plugin. It points to my personal Apple Pay sandbox merchant Id and relay server. You should replace all the values with your own before running this demo.

> To run this on the web, it must be deployed to a domain that is verified by Apple in the developer portal. It will not run on any un-verified domain.

### Installing Dependencies

This project is already configured with the plugin, however you would typically install the plugin as follows:

```bash
$ npm i @ionic-enterprise/apple-pay
```

Once the plugin is installed, in order for it to work correctly on the web, you need to register the plugin in the main.ts file

```typescript
// main.ts
import '@ionic-enterprise/apple-pay';
```

After registering the plugin, you can consume the plugin similar to any other Capacitor plugin. See payments.service.ts file for a simple example of how you might abstract the code to work in your application.
