import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import { useAuth } from "../contexts/auth/AuthContext";
import { useRoles } from "../hooks/auth/useRoles";

const AuthScreen = () => {
  const navigation = useNavigation();
  const { login, isLoading } = useAuth();
  const { navigateToRoleDashboard } = useRoles();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "0",
  });

  const [isPickerVisible, setPickerVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const roleOptions = [
    { label: "Admin", value: "0" },
    { label: "Owner", value: "1" },
    { label: "Manager", value: "2" },
    { label: "Account Manager", value: "3" },
    { label: "Content Manager", value: "4" },
    { label: "Instructor", value: "5" },
    { label: "Learner", value: "6" },
  ];

  const handleRoleSelect = (role) => {
    setForm({ ...form, role });
    setPickerVisible(false);
  };

  const togglePickerVisibility = () => {
    setPickerVisible(!isPickerVisible);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (!form.email || !form.password) {
        Toast.show({
          type: "error",
          text1: "Validation Error",
          text2: "Username and Password are required.",
        });
        setLoading(false);
        return;
      }

      const response = await login({
        username: form.email,
        password: form.password,
        role: form.role,
      });

      if (!response || !response.token) {
        throw new Error("Login failed. No response received.");
      }

      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: "Welcome back!",
      });

      setUserRole(form.role);
    } catch (error) {
      console.error("❌ Login failed:", error);
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.message || "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userRole) {
      navigateToRoleDashboard(userRole);
    }
  }, [userRole]);

  if (isLoading || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#075eec" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Sign in to</Text>
          <Text style={styles.appName}>FreeDevelopersCamp</Text>
          <Text style={styles.subtitle}>
            Get access to your portfolio and more
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>User name</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="default"
              onChangeText={(email) => setForm({ ...form, email })}
              placeholder="username"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.email}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={(password) => setForm({ ...form, password })}
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
              value={form.password}
            />
          </View>

          {/* Role Selection */}
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Role</Text>
            {isPickerVisible ? (
              <Picker
                selectedValue={form.role}
                onValueChange={handleRoleSelect}
                style={styles.pickerControl}
              >
                {roleOptions.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    color="#333"
                    style={{ fontSize: 16 }}
                  />
                ))}
              </Picker>
            ) : (
              <TouchableOpacity onPress={togglePickerVisibility}>
                <TextInput
                  style={styles.inputControl}
                  editable={false}
                  value={
                    roleOptions.find((option) => option.value === form.role)
                      ?.label
                  }
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={togglePickerVisibility}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Change Role</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleLogin} disabled={loading}>
              <View style={[styles.btn, { opacity: loading ? 0.5 : 1 }]}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.btnText}>Sign in</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.formLink}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.formFooter}>
          Don't have an account?{" "}
          <Text style={{ textDecorationLine: "underline" }}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  iconContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#075eec",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 5,
  },
  form: {
    marginTop: 20,
  },
  input: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  inputControl: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  pickerControl: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
  formAction: {
    marginBottom: 20,
  },
  btn: {
    backgroundColor: "#075eec",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
  formLink: {
    color: "#075eec",
    textAlign: "center",
    fontSize: 14,
    marginTop: 10,
  },
  formFooter: {
    textAlign: "center",
    fontSize: 14,
    color: "#6b7280",
    marginTop: 20,
  },
});
