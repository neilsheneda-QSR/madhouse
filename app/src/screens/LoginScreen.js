import React from "react";
import AuthScreen from "./AuthScreen";

export default function LoginScreen({ navigation, onLogin }) {
  return (
    <AuthScreen
      mode="login"
      onSwitch={() => navigation.navigate("Register")}
      onSubmit={onLogin}
    />
  );
}
