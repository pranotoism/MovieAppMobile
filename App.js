import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";
import Home from "./screens/Home";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <Home />
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
