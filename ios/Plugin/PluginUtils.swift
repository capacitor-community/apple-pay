//
//  PluginUtils.swift
//  Plugin
//
//  Created by Dallas James on 1/13/21.
//  Copyright © 2021 Ionic. All rights reserved.
//

import Foundation
import PassKit

class PluginUtils: NSObject {
    
    static func log(statementToPrint: String, functionName: String = #function, line:Int = #line) {
        print("\(functionName) [line \(line)] \(statementToPrint)")
    }
    
    static func jsMerchantCapabilityToEnum(capability: String) -> PKMerchantCapability? {
        switch capability {
        case "supports3DS":
            return .capability3DS
        case "supportsDebit":
            return .capabilityDebit
        case "supportsCredit":
            return .capabilityCredit
        case "supportsEMV":
            return .capabilityEMV
        default:
            return nil
        }
    }
    
    static func jsSupportedNetworkToEnum(network: String) -> PKPaymentNetwork? {
        switch network {
        case "amex":
            return .amex
//        case "cartesBancaires":
//            return .cartesBancaires
        case "chinaUnionPay":
            return .chinaUnionPay
        case "discover":
            return .discover
//        case "eftpos":
//            return .eftpos
//        case "electron":
//            return .electron
//        case "elo":
//            return .elo
        case "interac":
            return .interac
        case "jcb":
            return .JCB
//        case "mada":
//            return .mada
//        case "maestro":
//            return .maestro
        case "masterCard":
            return .masterCard
        case "privateLabel":
            return .privateLabel
        case "visa":
            return .visa
//        case "vPay":
//            return .vPay
        default:
            return nil
        }
    }
    
    static func summaryItemTypeToEnum(val: String) -> PKPaymentSummaryItemType {
        switch val {
        case "pending":
            return .pending
        case "final":
            return .final
        default:
            return .final
        }
    }
    
    static func pkPaymentMethodToString(val: PKPaymentMethodType) -> String {
        switch val {
        case .credit:
            return "credit"
        case .debit:
            return "debit"
        case .prepaid:
            return "prepaid"
        case .store:
            return "store"
        case .unknown:
            return "unknown"
        default:
            return "unknown"
        }
    }
    
    static func castToPKSummaryItem(item: JSSummaryItem) -> PKPaymentSummaryItem {
        return PKPaymentSummaryItem(
            label: item.label,
            amount: NSDecimalNumber(string: item.amount),
            type: PluginUtils.summaryItemTypeToEnum(val: (item.type ?? "final")))
    }
    
    static func castSupportedNetworksToEnum(networks: [String]) -> [PKPaymentNetwork] {
        networks.map { (value) -> PKPaymentNetwork in
            return PluginUtils.jsSupportedNetworkToEnum(network: value)!
        }
    }
    
    static func castMerchantCapabilitiesToEnum(capabilities: [String]) -> [PKMerchantCapability] {
        capabilities.map { (value) -> PKMerchantCapability in
            return PluginUtils.jsMerchantCapabilityToEnum(capability: value)!
        }
    }
    
    static func castMerchantValidationToClass(jsMerchantValidation: AnyObject) -> JSMerchantValidation {
        let jsMerchantParams = jsMerchantValidation["params"] as! [String: String]
        let merchant = JSMerchantValidation(
            url: jsMerchantValidation["url"] as? String ?? "",
            params: JSMerchantValidationParams(
                merchantIdentifier: (jsMerchantParams["merchantIdentifier"] ?? ""),
                displayName: (jsMerchantParams["displayName"] ?? ""),
                initiative: (jsMerchantParams["initiative"] ?? ""),
                initiativeContext: (jsMerchantParams["initiativeContext"] ?? "")
            )
        )
        return merchant
    }

    static func castPaymentAuthorizationToClass(jsAuthorization: AnyObject) -> JSPaymentAuthorization {
        return JSPaymentAuthorization(
            url: jsAuthorization["url"] as? String ?? ""
        )
    }
    
    static func castRequestToClass(jsRequest: AnyObject) -> JSPaymentRequest {
        let jsTotalItem = jsRequest["total"] as! [String: String]
        let jsLineItems = jsRequest["lineItems"] as! [[String: String]]
        let request = JSPaymentRequest(
            countryCode: jsRequest["countryCode"] as? String ?? "",
            currencyCode: jsRequest["currencyCode"] as? String ?? "",
            merchantCapabilities: jsRequest["merchantCapabilities"] as? [String] ?? [],
            supportedNetworks: jsRequest["supportedNetworks"] as? [String] ?? [],
            lineItems: jsLineItems.map { (item) -> JSSummaryItem in
                return JSSummaryItem(
                    label: item["label"] ?? "",
                    amount: item["amount"] ?? "",
                    type: item["type"] ?? "")
            },
            total: JSSummaryItem(
                label: jsTotalItem["label"] ?? "",
                amount: jsTotalItem["amount"] ?? "",
                type: jsTotalItem["type"] ?? ""
            )
        )
        return request
    }
    
    static func castPKPaymentTokenToClass(data: PKPaymentToken) -> TokenData {
        let decoder = JSONDecoder()
        var parsedToken = TokenPaymentData(
            data: "",
            signature: "",
            header: TokenPaymentHeaderData(
                publicKeyHash: "",
                ephemeralPublicKey: "",
                transactionId: ""),
            version: "")
        do {
            parsedToken = try decoder.decode(TokenPaymentData.self, from: data.paymentData)
        } catch {
            debugPrint("Unable to decode payment token")
        }
        
        let mappedData = TokenData(
            paymentData: TokenPaymentData(
                data: parsedToken.data,
                signature: parsedToken.signature,
                header: TokenPaymentHeaderData(
                    publicKeyHash: parsedToken.header.publicKeyHash,
                    ephemeralPublicKey: parsedToken.header.ephemeralPublicKey,
                    transactionId: parsedToken.header.transactionId),
                version: parsedToken.version),
            paymentMethod: TokenPaymentMethod(
                displayName: data.paymentMethod.displayName ?? "",
                network: data.paymentMethod.network?.rawValue ?? "",
                type: PluginUtils.pkPaymentMethodToString(val: data.paymentMethod.type)),
            transactionIdentifier: data.transactionIdentifier)

        return mappedData
    }
    
    static func httpPost(
        url: URL,
        data: AuthorizationPaymentData,
        headers: [String:String],
        onHttpComplete: @escaping (ApplePayHttpResponse) -> Void) -> Void {
        let result = ApplePayHttpResponse()
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        do {
            let encoder = JSONEncoder()
            request.httpBody = try encoder.encode(data)
//            request.httpBody = data as Data
        } catch let e {
            result.addError(e: e)
            onHttpComplete(result)
            return;
        }
        
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            debugPrint("HTTP RESPONSE")
            if error != nil {
                result.addError(e: error!)
                onHttpComplete(result)
                return;
            }
            let res = response as! HTTPURLResponse
            result.statusCode = res.statusCode
            result.data = data
            onHttpComplete(result)
        }
        
        task.resume()
    }
}
