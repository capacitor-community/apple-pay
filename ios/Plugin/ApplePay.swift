//
//  ApplePay.swift
//  Plugin
//
//  Created by Dallas James on 1/13/21.
//  Copyright © 2021 Ionic. All rights reserved.
//

import Foundation
import PassKit

typealias PaymentCompletionHandler = (Bool, Data?) -> Void

class ApplePayHandler: NSObject {
    
    var paymentController: PKPaymentAuthorizationController?
    var paymentStatus = PKPaymentAuthorizationStatus.failure
    var paymentSummaryItems = [PKPaymentSummaryItem]()
    var completionHandler: PaymentCompletionHandler!
    var authorizationUrl: String?
    var paymentRequest: JSPaymentRequest!
    var ogPaymentRequest: AnyObject!
    var resData: Data?
    
    class func canMakePayments(jsNetworks: [String]) -> (canMakePayments: Bool, canSetupCards: Bool) {
        let networks = PluginUtils.castSupportedNetworksToEnum(networks: jsNetworks)
        return (PKPaymentAuthorizationController.canMakePayments(),  PKPaymentAuthorizationController.canMakePayments(usingNetworks: networks))
    }
    
    func makePaymentRequest(jsMerchantValidation: AnyObject, jsAuthorization: AnyObject, jsRequest: AnyObject, onComplete: @escaping PaymentCompletionHandler) -> Bool {
        completionHandler = onComplete
        
        let merchant = PluginUtils.castMerchantValidationToClass(jsMerchantValidation: jsMerchantValidation)
        let authorization = PluginUtils.castPaymentAuthorizationToClass(jsAuthorization: jsAuthorization)
        let request = PluginUtils.castRequestToClass(jsRequest: jsRequest)
        ogPaymentRequest = jsRequest
        
        var summaryItems = request.lineItems.map { (item) -> PKPaymentSummaryItem in
            return PluginUtils.castToPKSummaryItem(item: item)
        }
        summaryItems.append(PluginUtils.castToPKSummaryItem(item: request.total))
        paymentSummaryItems = summaryItems
        authorizationUrl = authorization.url
        paymentRequest = request
        let capabilities = PluginUtils.castMerchantCapabilitiesToEnum(capabilities: request.merchantCapabilities)
        
        // Build Payment Request Object
        let paymentRequest = PKPaymentRequest()
        paymentRequest.paymentSummaryItems = paymentSummaryItems
        paymentRequest.merchantIdentifier = merchant.params.merchantIdentifier
        paymentRequest.merchantCapabilities = capabilities[0]
        paymentRequest.countryCode = request.countryCode
        paymentRequest.currencyCode = request.currencyCode
        paymentRequest.supportedNetworks = PluginUtils.castSupportedNetworksToEnum(networks: request.supportedNetworks)
        
        // Display payment request
        paymentController = PKPaymentAuthorizationController(paymentRequest: paymentRequest)
        paymentController?.delegate = self
        paymentController?.present(completion: { (presented: Bool) in
            if presented {
                debugPrint("Presented payment controller")
            } else {
                debugPrint("Failed to present payment controller")
                self.completionHandler(false, self.resData)
            }
        })
        
        return true
    }
}

extension ApplePayHandler: PKPaymentAuthorizationControllerDelegate {
    
    func paymentAuthorizationController(_ controller: PKPaymentAuthorizationController, didAuthorizePayment payment: PKPayment, handler completion: @escaping (PKPaymentAuthorizationResult) -> Void) {
        
        debugPrint("are we getting in here?")
        var errors = [Error]()
        var status = PKPaymentAuthorizationStatus.success
        
        // Make HTTP Request with the information required for processing
        let url = URL(string: self.authorizationUrl!)!
        let data = AuthorizationPaymentData(request: self.paymentRequest, token: PluginUtils.castPKPaymentTokenToClass(data: payment.token))
        PluginUtils.httpPost(url: url, data: data, headers: [:], onHttpComplete: { response in
            debugPrint("http post complete")
            debugPrint(response)
            guard (200...299) ~= response.statusCode else {
                status = .failure
                errors = response.errors
                completion(PKPaymentAuthorizationResult(status: status, errors: errors))
                return
            }
            self.paymentStatus = status
            self.resData = response.data
            completion(PKPaymentAuthorizationResult(status: status, errors: errors))
        })
    }
    
    func paymentAuthorizationControllerDidFinish(_ controller: PKPaymentAuthorizationController) {
        controller.dismiss {
            DispatchQueue.main.async {
                if self.paymentStatus == .success {
                    self.completionHandler!(true, self.resData)
                } else {
                    self.completionHandler!(false, self.resData)
                }
            }
        }
    }
    
    func paymentAuthorizationController(_ controller: PKPaymentAuthorizationController, didSelectPaymentMethod paymentMethod: PKPaymentMethod, handler completion: @escaping (PKPaymentRequestPaymentMethodUpdate) -> Void) {
        completion(PKPaymentRequestPaymentMethodUpdate(paymentSummaryItems: paymentSummaryItems))
        return
    }
}
