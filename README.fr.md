# @nitrique/rn-proximity-reader-discovery

Un module Expo qui encapsule l'API [`ProximityReaderDiscovery`](https://developer.apple.com/documentation/proximityreader/proximityreaderdiscovery) d'Apple pour afficher les écrans d'éducation Tap to Pay on iPhone.

iOS 18.0+ uniquement.

## Prérequis

Avant d'utiliser ce module, vous **devez** compléter la configuration Tap to Pay d'Apple. Sans ces étapes, l'application ne compilera pas ou plantera au lancement avec une erreur de restriction sandbox.

1. **Suivez le [guide du programme Tap to Pay on iPhone](https://developer.apple.com/tap-to-pay/)** pour demander l'accès et configurer votre compte développeur.
2. **Lisez les [Human Interface Guidelines pour Tap to Pay on iPhone](https://developer.apple.com/design/human-interface-guidelines/tap-to-pay-on-iphone)** pour vous assurer que votre intégration respecte les exigences de design d'Apple.
3. **Ajoutez l'entitlement** `com.apple.developer.proximity-reader.payment.acceptance` à votre application (voir [Intégration](#intégration-avec-une-app-expo-existante) ci-dessous).
4. **Activez la capability Tap to Pay on iPhone** sur votre App ID dans [Certificates, Identifiers & Profiles](https://developer.apple.com/account/resources/) et regénérez votre profil de provisionnement.

## TestFlight & Production

L'entitlement Tap to Pay on iPhone fonctionne en **mode sandbox** par défaut, ce qui est suffisant pour le développement.

Pour la distribution **TestFlight et App Store**, vous devez :

1. Demander l'accès au **mode production** auprès d'Apple via le programme [Tap to Pay on iPhone](https://developer.apple.com/tap-to-pay/).
2. Compléter la **checklist de déploiement** d'Apple pour Tap to Pay en production : [checklist](https://apple.box.com/v/ttpoichecklist).
3. Vous assurer que vos profils de provisionnement sont configurés pour les entitlements de production.

Sans l'accès production, `ProximityReaderDiscovery` renverra des erreurs dans les builds TestFlight.

## Installation

```bash
npx expo install @nitrique/rn-proximity-reader-discovery
```

## Utilisation

```typescript
import { presentTapToPayEducation } from "@nitrique/rn-proximity-reader-discovery";

try {
  await presentTapToPayEducation();
} catch (error) {
  // Gestion des erreurs (iOS < 18.0, entitlement manquant, etc.)
  console.error(error);
}
```

## Intégration avec une app Expo existante

### 1. Installer le module

```bash
npx expo install @nitrique/rn-proximity-reader-discovery
```

### 2. Ajouter l'entitlement et les localisations

Dans votre `app.json` (ou `app.config.js`) :

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

Le tableau `CFBundleLocalizations` indique à iOS les langues supportées par votre application. Les écrans d'éducation d'Apple sont localisés automatiquement, mais ne s'afficheront dans la langue de l'appareil que si celle-ci est listée ici. Ajoutez toutes les langues pertinentes pour vos utilisateurs.

### 3. Rebuild

Ce module contient du code natif, un rebuild natif est nécessaire :

```bash
npx expo prebuild --clean
npx expo run:ios
```

### 4. Utiliser dans votre app

```typescript
import { presentTapToPayEducation } from "@nitrique/rn-proximity-reader-discovery";
import { Alert, Button } from "react-native";

function TapToPaySetup() {
  const handleEducation = async () => {
    try {
      await presentTapToPayEducation();
    } catch (error: any) {
      Alert.alert("Erreur", error.message);
    }
  };

  return <Button title="Découvrir Tap to Pay" onPress={handleEducation} />;
}
```

## API

### `presentTapToPayEducation()`

Affiche la modale système d'Apple expliquant comment accepter les paiements sans contact avec Tap to Pay on iPhone.

- **Retourne :** `Promise<void>` — se résout quand l'utilisateur ferme la modale.
- **Erreurs :** si iOS < 18.0, si l'entitlement est manquant, ou si le contenu ne peut pas être affiché.

## Licence

MIT
