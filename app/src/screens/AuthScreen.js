import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, typography, spacing } from "../styles";
export default function AuthScreen({ mode, onSwitch, onSubmit }) {
  const isLogin = mode === "login";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);

  const validate = () => {
    const nextErrors = {};

    if (!isLogin && !name.trim()) {
      nextErrors.name = "Name is required";
    }

    if (!email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!validateEmail(email.trim())) {
      nextErrors.email = "Enter a valid email";
    }

    if (!password) {
      nextErrors.password = "Password is required";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (!confirmPassword) {
        nextErrors.confirmPassword = "Confirm your password";
      } else if (confirmPassword !== password) {
        nextErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit({
          name: name.trim(),
          email: email.trim(),
          password,
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={require("../../assets/PrimaryLogo.png")}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="MadHouse logo"
        />
        <Text style={styles.title}>{isLogin ? "Login" : "Register"}</Text>

        {!isLogin && (
          <>
            <TextInput
              placeholder="Name"
              placeholderTextColor="#999"
              style={styles.input}
              value={name}
              onChangeText={setName}
              textContentType="name"
            />
            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
          </>
        )}

        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          textContentType={isLogin ? "password" : "newPassword"}
        />
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

        {!isLogin && (
          <>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              secureTextEntry
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              textContentType="newPassword"
            />
            {errors.confirmPassword ? (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            ) : null}
          </>
        )}

        {isLogin && (
          <TouchableOpacity style={styles.forgotWrapper}>
            <Text style={styles.forgotText}>Forgot?</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={[styles.button, isSubmitting && styles.buttonDisabled]} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {isSubmitting ? "Please wait..." : isLogin ? "Login" : "Register"}
          </Text>
        </TouchableOpacity>

        <View style={styles.switchRow}>
          <Text style={styles.switchText}>
            {isLogin ? "New here?" : "Already have an account?"}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setErrors({});
              if (onSwitch) {
                onSwitch();
              }
            }}
          >
            <Text style={styles.switchAction}>{isLogin ? " Register" : " Login"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg * 2,
  },
  title: {
    fontSize: typography.titleSize,
    fontFamily: typography.fontFamily,
    color: colors.black,
    marginBottom: spacing.lg,
  },
  logo: {
    width: "100%",
    height: 140,
    alignSelf: "center",
    marginBottom: spacing.lg,
  },
  input: {
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 10,
    fontSize: typography.bodySize,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.md,
  },
  errorText: {
    color: "#c62828",
    fontSize: typography.bodySize,
    fontFamily: typography.fontFamily,
    marginTop: -spacing.sm,
    marginBottom: spacing.md,
  },
  forgotWrapper: {
    alignItems: "flex-end",
    marginBottom: spacing.md,
  },
  forgotText: {
    color: colors.primary,
    fontSize: typography.subtitleSize,
    fontFamily: typography.fontFamily,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 10,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.bodySize,
    fontFamily: typography.fontFamily,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.lg,
  },
  switchText: {
    fontSize: typography.bodySize,
    fontFamily: typography.fontFamily,
    color: colors.black,
  },
  switchAction: {
    fontSize: typography.bodySize,
    fontFamily: typography.fontFamily,
    color: colors.primary,
  },
});
