import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { onAuthStateChanged } from "firebase/auth";

import { firebaseAuth } from "./src/firebase";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import { colors } from "./src/styles";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState("Login");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    try {
      await firebaseAuth.signOut();
      setScreen("Login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const navigation = {
    navigate: (screenName) => setScreen(screenName),
  };

  if (loading) {
    return (
      <SafeAreaProvider>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    );
  }

  if (user) {
    return (
      <SafeAreaProvider>
        <HomeScreen onSignOut={handleSignOut} user={user} />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      {screen === "Login" ? (
        <LoginScreen navigation={navigation} />
      ) : (
        <RegisterScreen navigation={navigation} />
      )}
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
});
