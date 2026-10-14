---
title: Configuration
sidebar_label: Configuration
---

Apple Pay requires some configuration in your [Apple Developer Account](https://developer.apple.com/) and you application:
* [Enable Apple Pay for your App ID](#enable-apple-pay)
* [Create a Processing Certificate](#processing-certificate)
* [Create a Merchant Identity Certificate](#merchant-identity-certificate) (if your app is deployed to the web)
* [Add the Apple Pay Capability](#apple-pay-capability)

## Enable Apple Pay
Visit your [Apple Developer Account](https://developer.apple.com/) and associate Apple Pay with your app.
In your App ID Configuration:
1. Check the `Enabled` box in the capability for "Apple Pay Payment Processing". 
1. Click the `Configure` button to create a `Merchant Idenfitier`.
1. Click the `Create Certificate` button under `Apple Pay Payment Processing Certificate`.
1. You will be asked to upload a certificate signing request. 

## Processing Certificate

> NOTE: The documentation provided by Apple is incorrect and you will get an error `Incorrect CSR Key Pair - Expected a Key Pair with ECC Algorithm and key size of 256 bits. Create a new CSR and try again.`. 

Follow these instructions to create a CSR for Apple Pay:

1. Open the `Keychain Access` app
1. Within the Keychain Access drop down menu, select `Keychain Access` → `Certificate Assistant` → `Request a Certificate from a Certificate Authority`.
1. In the User Email Address field, enter your email address.
1. Choose `Request Is` → `Saved to disk`.
1. Check the box marked `Let me specify key pair information`.
1. Click `Continue`.
1. Choose a location to save.
1. Choose `ECC` as the Algoritm.
1. Choose a key size of `256 bits`.
1. Click `Continue`.
1. Click `Download`.
1. Save the `apple_pay.cer` file.

> NOTE: You should open the `apple_pay.cer` in `Keychain Access`, right click it, choose `Export ...`, exporting as a `p12` file with a name like `apple-pay-processing.p12` and provide a password. A `p12` file contains both the certificate and private key and allows its use on a computer other than your own.

## Merchant Identity Certificate
In your App ID Configuration:
1. Click the `Configure` button next to the `Apple Pay Payment Processing` capability. 
1. Click the `Add Domain` button.
1. Specify the fully qualified domain name of the website you will invoke Apple Pay from. (Eg `www.my-company.com`).
1. Click `Download`. You will need to verify ownership of the domain by uploading this file to the `.well-known` folder.

Create a Merchant Identity Certificate:
1. Click the `Create Certificate` button.

You will need to open a Certificate Signing Request (CSR):

1. Open the `Keychain Access` app.
1. Within the Keychain Access drop down menu, select `Keychain Access` → `Certificate Assistant` → `Request a Certificate from a Certificate Authority`.
1. In the User Email Address field, enter your email address.
1. Choose `Request Is` → `Saved to disk`.
1. Click `Continue`.
1. Choose a location to save.

On the Apple Developer Page:
- Click `Download`
- Save the `merchant_id.cer` file

> NOTE: You should open the `merchant_id.cer` in `Keychain Access`, right click it, choose `Export ...`, exporting as a `p12` file with a name like `apple-pay-merchant-id.p12` and provide a password. A `p12` file contains both the certificate and private key and allows its use on a computer other than your own.

## Apple Pay Capability

Your application needs the Apple Pay Capability added and associated to the `Merchant Identifier` you created.

Open your project in XCode and:
1. Select your App from the left pane.
1. Choose `Signing & Capabilities`.
1. Click the `+` icon (next to `All`).
1. Double click `Apple Pay`.
1. Click the checkbox next to the Merchant ID you created.

> Without the Apple Pay capability assigned to a Merchant ID you will get an error when [makePaymentRequest](classes/applepay.md#makepaymentrequest) is called.

## Certification Expiration

Certificates expire in around 2 years so be sure to setup a reminder to renew the certificate before expiration. The expiration date can be found in the [Certifcates](https://developer.apple.com/account/resources/certificates/list) section of the Apple Developer portal.

