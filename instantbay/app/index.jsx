import { StyleSheet, View } from "react-native";
import App from "../components/App";

export default function Page() {
  return (
    <View style={styles.container}>
      <App />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
