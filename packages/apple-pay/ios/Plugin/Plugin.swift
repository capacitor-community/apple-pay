import Foundation
import Capacitor
import PassKit

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(ApplePay)
public class ApplePay: CAPPlugin {
    
    var handlerRef: ApplePayHandler!

    @objc func setLogLevel(_ call: CAPPluginCall) {
        call.resolve()
    }

    @objc func canMakePayments(_ call: CAPPluginCall) {
        let networks = (call.getArray("supportedNetworks", String.self) ?? []) as [String]
        let canMakePayments = ApplePayHandler.canMakePayments(jsNetworks: networks)
        call.resolve([
            "canMakePayments": canMakePayments.canMakePayments && canMakePayments.canSetupCards
        ])
    }

    @objc func makePaymentRequest(_ call: CAPPluginCall) {
        let merchantValidation = call.getObject("merchantValidation") as AnyObject
        let paymentAuthorization = call.getObject("paymentAuthorization") as AnyObject
        let requestData = call.getObject("request") as AnyObject
        handlerRef = ApplePayHandler()
        _ = handlerRef.makePaymentRequest(
            jsMerchantValidation: merchantValidation,
            jsAuthorization: paymentAuthorization,
            jsRequest: requestData,
            onComplete: {(success, data) in
            if success {
                do {
                    if let json = try JSONSerialization.jsonObject(with: data!, options: []) as? [String: Any] {
                            call.resolve(["success": true, "data": json])
                        return
                    }
                } catch {}
                call.resolve([
                    "success": true,
                    "data": nil
                ])
            } else {
                call.reject("Unable to complete payment")
            }
        })
    }
}
