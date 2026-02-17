import { requireNativeModule } from "expo";
import { Platform } from "react-native";

interface RnProximityReaderDiscoveryNativeModule {
  show(topic: string): Promise<void>;
}

const NativeModule: RnProximityReaderDiscoveryNativeModule =
  Platform.OS === "ios" && !Platform.isPad && !Platform.isTV && !Platform.isVision
    ? requireNativeModule<RnProximityReaderDiscoveryNativeModule>(
        "RnProximityReaderDiscovery"
      )
    : { show: () => Promise.resolve() };

/**
 * Present the Tap to Pay on iPhone education screen.
 * Opens a system-provided modal sheet showing the user
 * how to tap for contactless payments.
 *
 * Requires iOS 18.0+ and the Tap to Pay on iPhone entitlement.
 */
export async function presentTapToPayEducation(): Promise<void> {
  return NativeModule.show("paymentHowToTap");
}
