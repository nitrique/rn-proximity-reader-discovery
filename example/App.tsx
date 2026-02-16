import { useState } from "react";
import { presentTapToPayEducation } from "@nitrique/rn-proximity-reader-discovery";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [loading, setLoading] = useState(false);

  const handleShow = async () => {
    setLoading(true);
    try {
      await presentTapToPayEducation();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>ProximityReaderDiscovery</Text>
        <Text style={styles.subtitle}>Tap to Pay on iPhone Education</Text>
        <Button
          title={loading ? "Presenting…" : "Show How to Tap"}
          onPress={handleShow}
          disabled={loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#eee",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
  },
});
