import React, { useState } from "react";
import { Alert } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { firebaseAuth, firebaseDb } from "../firebase";
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
      
      // Create user document in Firestore
      await setDoc(doc(firebaseDb, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      // Navigation will happen automatically via onAuthStateChanged in App.js
    } catch (err) {
      console.error("Registration error:", err);
      console.error("Error code:", err.code);
      console.error("Error message:", err.message);
      
      let message = "Registration failed. Please try again.";
      
      if (err.code === "auth/email-already-in-use") {
        message = "This email is already registered. Please login instead.";
      } else if (err.code === "auth/invalid-email") {
        message = "Invalid email address.";
      } else if (err.code === "auth/weak-password") {
        message = "Password is too weak. Please use a stronger password.";
      } else if (err.code === "auth/network-request-failed") {
        message = "Network error. Please check your connection.";
      } else if (err.code === "permission-denied" || err.message?.includes("permission")) {
        message = "Database permission error. Please check Firestore rules.";
      } else {
        // Include the actual error message for debugging
        message = `Registration failed: ${err.message}`;
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
