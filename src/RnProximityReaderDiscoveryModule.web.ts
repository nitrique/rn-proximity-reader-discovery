import { registerWebModule, NativeModule } from 'expo';

import { RnProximityReaderDiscoveryModuleEvents } from './RnProximityReaderDiscovery.types';

class RnProximityReaderDiscoveryModule extends NativeModule<RnProximityReaderDiscoveryModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(RnProximityReaderDiscoveryModule, 'RnProximityReaderDiscoveryModule');
