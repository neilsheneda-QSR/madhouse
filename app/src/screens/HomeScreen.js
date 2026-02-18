import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, typography, spacing } from "../styles";

export default function HomeScreen({ onSignOut }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Home</Text>
        <Text style={styles.subtitle}>House overview coming soon.</Text>
        <TouchableOpacity style={styles.button} onPress={onSignOut}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontSize: typography.titleSize,
    fontFamily: typography.fontFamily,
    color: colors.black,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.subtitleSize,
    fontFamily: typography.fontFamily,
    color: colors.black,
    marginBottom: spacing.lg,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 10,
  },
  buttonText: {
    color: colors.white,
    fontFamily: typography.fontFamily,
    fontSize: typography.bodySize,
  },
});
