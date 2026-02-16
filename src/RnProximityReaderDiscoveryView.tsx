import { requireNativeView } from 'expo';
import * as React from 'react';

import { RnProximityReaderDiscoveryViewProps } from './RnProximityReaderDiscovery.types';

const NativeView: React.ComponentType<RnProximityReaderDiscoveryViewProps> =
  requireNativeView('RnProximityReaderDiscovery');

export default function RnProximityReaderDiscoveryView(props: RnProximityReaderDiscoveryViewProps) {
  return <NativeView {...props} />;
}
