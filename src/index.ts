// Reexport the native module. On web, it will be resolved to RnProximityReaderDiscoveryModule.web.ts
// and on native platforms to RnProximityReaderDiscoveryModule.ts
export { default } from './RnProximityReaderDiscoveryModule';
export { default as RnProximityReaderDiscoveryView } from './RnProximityReaderDiscoveryView';
export * from  './RnProximityReaderDiscovery.types';
