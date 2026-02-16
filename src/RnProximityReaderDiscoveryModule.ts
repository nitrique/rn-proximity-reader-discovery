import { NativeModule, requireNativeModule } from 'expo';

import { RnProximityReaderDiscoveryModuleEvents } from './RnProximityReaderDiscovery.types';

declare class RnProximityReaderDiscoveryModule extends NativeModule<RnProximityReaderDiscoveryModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<RnProximityReaderDiscoveryModule>('RnProximityReaderDiscovery');
