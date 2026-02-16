import * as React from 'react';

import { RnProximityReaderDiscoveryViewProps } from './RnProximityReaderDiscovery.types';

export default function RnProximityReaderDiscoveryView(props: RnProximityReaderDiscoveryViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
