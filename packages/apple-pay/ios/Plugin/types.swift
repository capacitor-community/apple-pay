//
//  Types.swift
//  Plugin
//
//  Created by Dallas James on 1/13/21.
//  Copyright © 2021 Ionic. All rights reserved.
//

import Foundation
import PassKit

struct PaymentResult {
    var success: Bool = false
    var data: Data?
}

struct JSSummaryItem: Codable {
    var label: String
    var amount: String
    var type: String?

    init(label: String, amount: String, type: String?) {
        self.label = label
        self.amount = amount
        self.type = type
    }
}

struct JSMerchantValidationParams {
    var merchantIdentifier: String
    var displayName: String
    var initiative: String
    var initiativeContext: String

    init(
        merchantIdentifier: String, displayName: String, initiative: String, initiativeContext: String
    ) {
        self.merchantIdentifier = merchantIdentifier
        self.displayName = displayName
        self.initiative = initiative
        self.initiativeContext = initiativeContext
    }
}

struct JSMerchantValidation {
    var url: String
    var params: JSMerchantValidationParams

    init(fromJSMerchantValidation: AnyObject) throws {
        url = fromJSMerchantValidation["url"] as? String ?? ""

        guard let jsMerchantParams = fromJSMerchantValidation["params"] as? [String: String] else {
            throw ApplePayError.unhandledError("could not cast params to dictionary")
        }

        params = JSMerchantValidationParams(
            merchantIdentifier: (jsMerchantParams["merchantIdentifier"] ?? ""),
            displayName: (jsMerchantParams["displayName"] ?? ""),
            initiative: (jsMerchantParams["initiative"] ?? ""),
            initiativeContext: (jsMerchantParams["initiativeContext"] ?? ""))
    }
}

struct JSPaymentAuthorization {
    var url: String

    init(jsAuthorization: AnyObject) {
        url = jsAuthorization["url"] as? String ?? ""
    }
}

struct JSPaymentRequest: Codable {
    var countryCode: String
    var currencyCode: String
    var merchantCapabilities: [String]
    var supportedNetworks: [String]
    var lineItems: [JSSummaryItem]
    var total: JSSummaryItem

    init(jsRequest: AnyObject) throws {
        guard let jsTotalItem = jsRequest["total"] as? [String: String] else {
            throw ApplePayError.unhandledError("could not cast total to dictionary")
        }

        guard let jsLineItems = jsRequest["lineItems"] as? [[String: String]] else {
            throw ApplePayError.unhandledError("could not cast lineItems to dictionary")
        }

        countryCode = jsRequest["countryCode"] as? String ?? ""
        currencyCode = jsRequest["currencyCode"] as? String ?? ""
        merchantCapabilities = jsRequest["merchantCapabilities"] as? [String] ?? []
        supportedNetworks = jsRequest["supportedNetworks"] as? [String] ?? []

        lineItems = jsLineItems.map { (item) -> JSSummaryItem in
            return JSSummaryItem(
                label: item["label"] ?? "",
                amount: item["amount"] ?? "",
                type: item["type"] ?? "")
        }

        total = JSSummaryItem(
            label: jsTotalItem["label"] ?? "",
            amount: jsTotalItem["amount"] ?? "",
            type: jsTotalItem["type"] ?? ""
        )
    }
}

struct AuthorizationPaymentData: Codable {
    var request: JSPaymentRequest
    var token: TokenData

    init(request: JSPaymentRequest, token: TokenData) {
        self.request = request
        self.token = token
    }
}

struct TokenPaymentHeaderData: Codable {
    var publicKeyHash: String
    var ephemeralPublicKey: String
    var transactionId: String

    init() {
        publicKeyHash = ""
        ephemeralPublicKey = ""
        transactionId = ""
    }
}

struct TokenPaymentData: Codable {
    var data: String
    var signature: String
    var header: TokenPaymentHeaderData
    var version: String

    init() {
        data = ""
        signature = ""
        header = TokenPaymentHeaderData()
        version = ""
    }
}

struct TokenPaymentMethod: Codable {
    var displayName: String
    var network: String
    var type: String

    init(displayName: String, network: String, type: String) {
        self.displayName = displayName
        self.type = type
        self.network = network
    }
}

struct TokenData: Codable {
    var paymentData: TokenPaymentData
    var paymentMethod: TokenPaymentMethod
    var transactionIdentifier: String

    init(data: PKPaymentToken) {
        let decoder = JSONDecoder()
        paymentData = TokenPaymentData()

        if let parsedToken = try? decoder.decode(TokenPaymentData.self, from: data.paymentData) {
            paymentData = parsedToken
        }

        paymentMethod = TokenPaymentMethod(
            displayName: data.paymentMethod.displayName ?? "",
            network: data.paymentMethod.network?.rawValue ?? "",
            type: PluginUtils.pkPaymentMethodToString(val: data.paymentMethod.type)
        )
        transactionIdentifier = data.transactionIdentifier
    }
}

class ApplePayHttpResponse {
    var statusCode: Int = 200
    var success: Bool = true
    var errors = [Error]()
    var data: Data?

    func addError(err: Error, statusCode: Int = 400) {
        self.errors.append(err)
        self.statusCode = statusCode
        self.success = false
    }

    func clearErrors() {
        self.errors = []
        self.statusCode = 200
        self.success = true
    }
}
