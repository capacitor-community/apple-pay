# Example App Configuration (SPM)

This example app demonstrates the Apple Pay plugin using Swift Package Manager.

## Setup

Before running the app, update the Apple Pay configuration in `src/pages/Home.tsx`:

1. Replace `REPLACE_WITH_MERCHANT_IDENTIFIER` with your Apple Pay merchant identifier (e.g. `merchant.com.yourcompany.yourapp`).
2. Replace `REPLACE_WITH_MERCHANT_VALIDATION_URL` with the URL of your merchant validation endpoint.
3. Replace `REPLACE_WITH_AUTHORIZATION_URL` with the URL of your payment authorization endpoint.
4. Replace `REPLACE_WITH_DISPLAY_NAME` with your merchant display name.
5. Replace `REPLACE_WITH_INITIATIVE_CONTEXT` with your initiative context (e.g. `yourstore.com`).

You will also need to configure Apple Pay capabilities in Xcode (Signing & Capabilities) and associate your merchant identifier with your Apple Developer account.
