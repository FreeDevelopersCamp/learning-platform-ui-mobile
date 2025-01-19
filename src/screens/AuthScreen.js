import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";

import { useAuth } from "../contexts/auth/AuthContext";

import FreecodecampLogo from "../../assets/freecodecamp-svgrepo-com.svg";
import Toast from "react-native-toast-message";

export default function AuthScreen() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "0", // Default role is Admin
  });
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const { login } = useAuth(); // Access the login function from context

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
      await login({
        username: form.email,
        password: form.password,
        role: form.role,
      });
    } catch (error) {
      // Handle login error
      console.error("Login failed", error);

      // Show error toast
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: error.message || "Please check your credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      {/* Toast component */}
      <Toast ref={(ref) => Toast.setRef(ref)} />

      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <FreecodecampLogo width={50} height={50} />
          </View>

          <Text style={styles.title}>Sign in to</Text>
          <Text style={styles.appName}>
            <Text style={{ fontSize: 30, color: "#075eec" }}>
              FreeDevelopersCamp
            </Text>
          </Text>

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
              placeholder="examplecom"
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

          {/* Button to change role */}
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

      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.formFooter}>
          Don't have an account?{" "}
          <Text style={{ textDecorationLine: "underline" }}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignSelf: "center",
    marginBottom: 10,
  },
  container: {
    paddingVertical: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    color: "#1D2A32",
    textAlign: "center",
    marginBottom: 6,
  },
  appName: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1D2A32",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 36,
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: "600",
    color: "#075eec",
    textAlign: "center",
  },
  formFooter: {
    paddingVertical: 24,
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
  },
  pickerControl: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    zIndex: 1000,
    elevation: 5,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#075eec",
    borderColor: "#075eec",
  },
  btnText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});
