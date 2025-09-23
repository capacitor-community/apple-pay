import Capacitor
import Foundation
import PassKit

/// Please read the Capacitor iOS Plugin Development Guide
/// here: https://capacitorjs.com/docs/plugins/ios
@objc(ApplePay)
public class ApplePay: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "ApplePay" 
    public let jsName = "ApplePay" 
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "canMakePayments", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "makePaymentRequest", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setLogLevel", returnType: CAPPluginReturnPromise),
    ] 

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
            onComplete: { result in
                switch result {
                case .failure(let err):
                    self.sendError(call, err)
                    return
                case .success(let paymentResult):
                    if paymentResult.success {
                        if let data = paymentResult.data {
                            do {
                                if let json = try JSONSerialization.jsonObject(with: data, options: [])
                                    as? [String: Any] {
                                    call.resolve(["success": true, "data": json])
                                    return
                                }
                            } catch {}
                        }

                        call.resolve(["success": true, "data": []])
                    } else {
                        // return error
                        self.sendError(call, ApplePayError.unhandledError("Unable to complete payment"))
                        return
                    }
                }
            })
    }

    private func sendError(_ call: CAPPluginCall, _ error: Error) {
        let customError = getApplePayErrorObject(error)
        call.reject(
            customError.message, String(customError.code), error,
            customError.asDictionary as PluginCallResultData)
    }
}
