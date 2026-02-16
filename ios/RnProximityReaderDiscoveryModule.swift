import ExpoModulesCore
import ProximityReader

public class RnProximityReaderDiscoveryModule: Module {
  private var _discovery: Any?

  @available(iOS 18.0, *)
  private var discovery: ProximityReaderDiscovery {
    if let instance = _discovery as? ProximityReaderDiscovery {
      return instance
    }
    let instance = ProximityReaderDiscovery()
    _discovery = instance
    return instance
  }

  public func definition() -> ModuleDefinition {
    Name("RnProximityReaderDiscovery")

    AsyncFunction("show") { (topic: TopicEnum) in
      guard #available(iOS 18.0, *) else {
        throw NotSupportedException()
      }
      let swiftTopic = topic.toNativeTopic()
      let content = try await self.discovery.content(for: swiftTopic)
      let viewController = try await self.getCurrentViewController()
      try await self.discovery.presentContent(content, from: viewController)
    }

    AsyncFunction("getContentList") { () -> [[String: Any]] in
      guard #available(iOS 18.0, *) else {
        throw NotSupportedException()
      }
      let list = try await self.discovery.contentList
      return list.map { item in
        ["id": item.id, "description": item.description]
      }
    }

    AsyncFunction("getContent") { (topic: TopicEnum) -> [String: Any] in
      guard #available(iOS 18.0, *) else {
        throw NotSupportedException()
      }
      let swiftTopic = topic.toNativeTopic()
      let content = try await self.discovery.content(for: swiftTopic)
      return ["id": content.id, "description": content.description]
    }
  }

  @MainActor
  private func getCurrentViewController() throws -> UIViewController {
    guard let viewController = appContext?.utilities?.currentViewController() else {
      throw ViewControllerNotFoundException()
    }
    return viewController
  }
}
