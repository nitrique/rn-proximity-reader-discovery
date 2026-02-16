# @nitrique/rn-proximity-reader-discovery

An Expo module wrapping Apple's [`ProximityReaderDiscovery`](https://developer.apple.com/documentation/proximityreader/proximityreaderdiscovery) API to present Tap to Pay on iPhone education screens.

iOS 18.0+ only.

## Prerequisites

Before using this module, you **must** complete Apple's Tap to Pay setup. Without these steps, the app will not compile or will crash at runtime with a sandbox restriction error.

1. **Follow the [Tap to Pay on iPhone](https://developer.apple.com/tap-to-pay/) program guide** to request access and configure your developer account.
2. **Read the [Human Interface Guidelines for Tap to Pay on iPhone](https://developer.apple.com/design/human-interface-guidelines/tap-to-pay-on-iphone)** to ensure your integration meets Apple's design requirements.
3. **Add the entitlement** `com.apple.developer.proximity-reader.payment.acceptance` to your app (see [Integration](#integration-with-an-existing-expo-app) below).
4. **Enable the Tap to Pay on iPhone capability** on your App ID in [Certificates, Identifiers & Profiles](https://developer.apple.com/account/resources/) and regenerate your provisioning profile.

## TestFlight & Production

The Tap to Pay on iPhone entitlement runs in **sandbox mode** by default, which is sufficient for development.

For **TestFlight and App Store** distribution, you must:

1. Request **production mode** access from Apple through the [Tap to Pay on iPhone](https://developer.apple.com/tap-to-pay/) program.
2. Complete Apple's **deployment checklist** for Tap to Pay production here : [checklist](https://apple.box.com/v/ttpoichecklist).
3. Ensure your provisioning profiles are configured for production entitlements.

Without production access, `ProximityReaderDiscovery` will throw errors in TestFlight builds.

## Installation

```bash
npx expo install @nitrique/rn-proximity-reader-discovery
```

## Usage

```typescript
import { presentTapToPayEducation } from "@nitrique/rn-proximity-reader-discovery";

try {
  await presentTapToPayEducation();
} catch (error) {
  // Handle errors (iOS < 18.0, missing entitlement, etc.)
  console.error(error);
}
```

## Integration with an existing Expo app

### 1. Install the module

```bash
npx expo install @nitrique/rn-proximity-reader-discovery
```

### 2. Add the entitlement and localizations

In your `app.json` (or `app.config.js`):

```json
{
  "expo": {
    "ios": {
      "entitlements": {
        "com.apple.developer.proximity-reader.payment.acceptance": true
      },
      "infoPlist": {
        "CFBundleLocalizations": [
          "en", "fr", "de", "es", "it", "pt", "ja", "ko",
          "zh-Hans", "zh-Hant", "ar", "nl", "pl", "sv",
          "da", "fi", "nb", "th", "vi", "id", "tr", "ru"
        ]
      }
    }
  }
}
```

The `CFBundleLocalizations` array tells iOS which languages your app supports. Apple's education screens are localized automatically but will only display in the device's language if it is listed here. Add all languages relevant to your user base.

### 3. Rebuild

Since this module includes native code, you need a native rebuild:

```bash
npx expo prebuild --clean
npx expo run:ios
```

### 4. Use in your app

```typescript
import { presentTapToPayEducation } from "@nitrique/rn-proximity-reader-discovery";
import { Alert, Button } from "react-native";

function TapToPaySetup() {
  const handleEducation = async () => {
    try {
      await presentTapToPayEducation();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return <Button title="Learn about Tap to Pay" onPress={handleEducation} />;
}
```

## API

### `presentTapToPayEducation()`

Presents Apple's system-provided education sheet explaining how to accept contactless payments using Tap to Pay on iPhone.

- **Returns:** `Promise<void>` — resolves when the user dismisses the sheet.
- **Throws:** if iOS < 18.0, the entitlement is missing, or the content cannot be displayed.

## License

MIT
