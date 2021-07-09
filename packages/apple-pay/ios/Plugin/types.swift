//
//  Types.swift
//  Plugin
//
//  Created by Dallas James on 1/13/21.
//  Copyright © 2021 Ionic. All rights reserved.
//

import Foundation

class JSSummaryItem: Codable {
    var label: String
    var amount: String
    var type: String?
    
    init(label: String, amount: String, type: String?) {
        self.label = label
        self.amount = amount
        self.type = type
    }
}

class JSMerchantValidationParams {
    var merchantIdentifier: String
    var displayName: String
    var initiative: String
    var initiativeContext: String
    
    init(merchantIdentifier: String, displayName: String, initiative: String, initiativeContext: String) {
        self.merchantIdentifier = merchantIdentifier
        self.displayName = displayName
        self.initiative = initiative
        self.initiativeContext = initiativeContext
    }
}

class JSMerchantValidation {
    var url: String
    var params: JSMerchantValidationParams
    
    init(url: String, params: JSMerchantValidationParams) {
        self.url = url
        self.params = params
    }
}

class JSPaymentAuthorization {
    var url: String

    init(url: String) {
        self.url = url;
    }
}

class JSPaymentRequest: Codable {
    var countryCode: String
    var currencyCode: String
    var merchantCapabilities: [String]
    var supportedNetworks: [String]
    var lineItems: [JSSummaryItem]
    var total: JSSummaryItem
    
    init(countryCode: String, currencyCode: String, merchantCapabilities: [String], supportedNetworks: [String], lineItems: [JSSummaryItem], total: JSSummaryItem) {
        self.countryCode = countryCode
        self.currencyCode = currencyCode
        self.merchantCapabilities = merchantCapabilities
        self.supportedNetworks = supportedNetworks
        self.lineItems = lineItems
        self.total = total
    }
}

class AuthorizationPaymentData: Codable {
    var request: JSPaymentRequest
    var token: TokenData
    
    init(request: JSPaymentRequest, token: TokenData) {
        self.request = request
        self.token = token
    }
}

class TokenPaymentHeaderData: Codable {
    var publicKeyHash: String
    var ephemeralPublicKey: String
    var transactionId: String
    
    init(publicKeyHash: String, ephemeralPublicKey: String, transactionId: String) {
        self.publicKeyHash = publicKeyHash
        self.ephemeralPublicKey = ephemeralPublicKey
        self.transactionId = transactionId
    }
}

class TokenPaymentData: Codable {
    var data: String
    var signature: String
    var header: TokenPaymentHeaderData
    var version: String
    
    init(data: String, signature: String, header: TokenPaymentHeaderData, version: String) {
        self.data = data
        self.signature = signature
        self.header = header
        self.version = version
    }
}

class TokenPaymentMethod: Codable {
    var displayName: String
    var network: String
    var type: String
    
    init(displayName: String, network: String, type: String) {
        self.displayName = displayName
        self.type = type
        self.network = network
    }
}

class TokenData: Codable {
    var paymentData:  TokenPaymentData
    var paymentMethod: TokenPaymentMethod
    var transactionIdentifier: String
    
    init(paymentData: TokenPaymentData, paymentMethod: TokenPaymentMethod, transactionIdentifier: String) {
        self.paymentData = paymentData
        self.paymentMethod = paymentMethod
        self.transactionIdentifier = transactionIdentifier
    }
}

class ApplePayHttpResponse {
    var statusCode: Int = 200
    var success: Bool = true
    var errors = [Error]()
    var data: Data?
    
    func addError(e: Error) -> Void {
        self.errors.append(e)
        self.success = false
    }
    
    func clearErrors() -> Void {
        self.errors = []
        self.success = true
    }
}
