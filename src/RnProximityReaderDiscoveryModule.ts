import { requireNativeModule } from "expo";

interface RnProximityReaderDiscoveryNativeModule {
  show(topic: string): Promise<void>;
}

const NativeModule =
  requireNativeModule<RnProximityReaderDiscoveryNativeModule>(
    "RnProximityReaderDiscovery"
  );

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
