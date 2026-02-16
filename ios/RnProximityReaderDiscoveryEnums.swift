import ExpoModulesCore
import ProximityReader

enum TopicEnum: String, Enumerable {
  case paymentHowToTap = "paymentHowToTap"

  @available(iOS 18.0, *)
  func toNativeTopic() -> ProximityReaderDiscovery.Topic {
    switch self {
    case .paymentHowToTap:
      return .payment(.howToTap)
    }
  }
}
