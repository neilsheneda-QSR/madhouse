import React from "react";
import AuthScreen from "./AuthScreen";

export default function RegisterScreen({ navigation, onRegister }) {
  return (
    <AuthScreen
      mode="register"
      onSwitch={() => navigation.navigate("Login")}
      onSubmit={onRegister}
    />
  );
}
