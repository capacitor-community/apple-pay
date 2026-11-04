// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "IonicEnterpriseApplePay",
    platforms: [.iOS(.v16)],
    products: [
        .library(
            name: "IonicEnterpriseApplePay",
            targets: ["ApplePay"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor.git", from: "9.0.0-beta.0")
    ],
    targets: [
        .target(
            name: "ApplePay",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor")
            ],
            path: "ios/Sources/ApplePay"),
        .testTarget(
            name: "ApplePayTests",
            dependencies: ["ApplePay"],
            path: "ios/Tests/ApplePayTests")
    ]
)