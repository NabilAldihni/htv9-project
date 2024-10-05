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
    flex: 1,
    backgroundColor: '#F5F5F7',
    color: '#1D1D1F',
    right: 'auto',
    left: 'auto',
    alignContent: 'center',
    alignItems: "center",
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  }
});
