import { StyleSheet, SafeAreaView } from "react-native";
import App from "../components/App";

export default function Page() {
  return (
    <SafeAreaView style={styles.container}>
      <App />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
    color: '#1D1D1F',
    alignItems: "center",
    width: '100%',
    height: '100%',
  }
});
