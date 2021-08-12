import Foundation

public enum ApplePayError: Error {
    case notAvailable
    case unableToOpenSession
    case merchangeValidationFailed
    case authorizationFailed
    case userCanceled
    case unhandledError(_ description: String)
}

public struct ApplePayErrorObject {
    let extra: [String: Any]?
    let code: Int
    let message: String
    init(_ code: Int, _ message: String, _ extra: [String: Any]? = nil) {
        self.code = code
        self.message = message
        self.extra = extra
    }

    var asDictionary: [String: Any?] {
        return ["code": code, "message": message, "extra": extra]
    }
}

public func getApplePayErrorObject(_ error: Error) -> ApplePayErrorObject {
    switch error {
    case ApplePayError.notAvailable:
        return ApplePayErrorObject(
            1,
            """
      Apple Pay JS is not available.
      Check that your domain has been correctly validated, has the correct certificates,
      and that you are running on a compatible iOS device
      """
        )
    case ApplePayError.unableToOpenSession:
        return ApplePayErrorObject(2, "Unable to open new Apple Pay Session")
    case ApplePayError.merchangeValidationFailed:
        return ApplePayErrorObject(3, "Merchant validation failed")
    case ApplePayError.authorizationFailed:
        return ApplePayErrorObject(4, "Payment authorization failed")
    case ApplePayError.userCanceled:
        return ApplePayErrorObject(5, "User Canceled")
    default:
        return ApplePayErrorObject(0, "Unhandled Error: " + error.localizedDescription)
    }
}
