import React, { useState } from "react";
import { Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebase";
import AuthScreen from "./AuthScreen";

export default function LoginScreen({ navigation }) {
  const [error, setError] = useState("");

  const handleLogin = async ({ email, password }) => {
    try {
      setError("");
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      // Navigation will happen automatically via onAuthStateChanged in App.js
    } catch (err) {
      let message = "Login failed. Please try again.";
      
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found") {
        message = "Invalid email or password.";
      } else if (err.code === "auth/wrong-password") {
        message = "Invalid password.";
      } else if (err.code === "auth/too-many-requests") {
        message = "Too many failed attempts. Please try again later.";
      } else if (err.code === "auth/network-request-failed") {
        message = "Network error. Please check your connection.";
      }
      
      setError(message);
      Alert.alert("Login Error", message);
      throw err; // Re-throw to let AuthScreen handle the loading state
    }
  };

  return (
    <AuthScreen
      mode="login"
      onSwitch={() => navigation.navigate("Register")}
      onSubmit={handleLogin}
      error={error}
    />
  );
}
