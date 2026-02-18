import React, { useState } from "react";
import { Alert } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseAuth } from "../firebase";
import AuthScreen from "./AuthScreen";

export default function RegisterScreen({ navigation }) {
  const [error, setError] = useState("");

  const handleRegister = async ({ name, email, password }) => {
    try {
      setError("");
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      
      // Update the user's display name
      if (name && userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name,
        });
      }
      
      // Navigation will happen automatically via onAuthStateChanged in App.js
    } catch (err) {
      let message = "Registration failed. Please try again.";
      
      if (err.code === "auth/email-already-in-use") {
        message = "This email is already registered. Please login instead.";
      } else if (err.code === "auth/invalid-email") {
        message = "Invalid email address.";
      } else if (err.code === "auth/weak-password") {
        message = "Password is too weak. Please use a stronger password.";
      } else if (err.code === "auth/network-request-failed") {
        message = "Network error. Please check your connection.";
      }
      
      setError(message);
      Alert.alert("Registration Error", message);
      throw err; // Re-throw to let AuthScreen handle the loading state
    }
  };

  return (
    <AuthScreen
      mode="register"
      onSwitch={() => navigation.navigate("Login")}
      onSubmit={handleRegister}
      error={error}
    />
  );
}
