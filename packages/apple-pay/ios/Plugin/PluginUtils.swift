//
//  PluginUtils.swift
//  Plugin
//
//  Created by Dallas James on 1/13/21.
//  Copyright © 2021 Ionic. All rights reserved.
//

import Foundation
import PassKit


enum PluginUtils {

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
        case "cartesBancaires":
            if #available(iOS 11.2, *) {
                return .cartesBancaires
            }
            fallthrough
        case "chinaUnionPay":
            return .chinaUnionPay
        case "discover":
            return .discover
        case "eftpos":
            if #available(iOS 12.0, *) {
                return .eftpos
            }
            fallthrough
        case "electron":
            if #available(iOS 12.0, *) {
                return .electron
            }
            fallthrough
        case "elo":
            if #available(iOS 12.1.1, *) {
                return .elo
            }
            fallthrough
        case "interac":
            return .interac
        case "jcb":
            return .JCB
        case "mada":
            if #available(iOS 12.1.1, *) {
                return .mada
            }
            fallthrough
        case "maestro":
            if #available(iOS 12.0, *) {
                return .maestro
            }
            fallthrough
        case "masterCard":
            return .masterCard
        case "privateLabel":
            return .privateLabel
        case "visa":
            return .visa
        case "vPay":
            if #available(iOS 12.0, *) {
                return .vPay
            }
            fallthrough
        default:
            return nil
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

    static func castSupportedNetworksToEnum(networks: [String]) -> [PKPaymentNetwork] {
        return networks.compactMap { (value) -> PKPaymentNetwork? in
            return PluginUtils.jsSupportedNetworkToEnum(network: value)
        }
    }

    static func castMerchantCapabilitiesToEnum(capabilities: [String]) -> PKMerchantCapability {
        return PKMerchantCapability.init(
            capabilities.compactMap({ PluginUtils.jsMerchantCapabilityToEnum(capability: $0) })
        )
    }

    static func httpPost(
        url: URL,
        data: AuthorizationPaymentData,
        headers: [String:String],
        onHttpComplete: @escaping (ApplePayHttpResponse) -> Void) -> Void {
        let result = ApplePayHttpResponse()
        result.clearErrors()

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")

        do {
            let encoder = JSONEncoder()
            request.httpBody = try encoder.encode(data)
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
