import ExpoModulesCore

final class NotSupportedException: Exception {
  override var reason: String {
    "ProximityReaderDiscovery requires iOS 18.0 or later"
  }
}

final class ViewControllerNotFoundException: Exception {
  override var reason: String {
    "Unable to find the current view controller to present content"
  }
}
