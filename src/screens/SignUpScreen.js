import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import { useAuth } from "../contexts/auth/AuthContext";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const { register } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    roles: [],
  });
  const [loading, setLoading] = useState(false);
  const [isPickerVisible, setPickerVisible] = useState(false);

  const roleOptions = [
    { label: "Admin", value: "0" },
    { label: "Owner", value: "1" },
    { label: "Manager", value: "2" },
    { label: "Account Manager", value: "3" },
    { label: "Content Manager", value: "4" },
    { label: "Instructor", value: "5" },
    { label: "Learner", value: "6" },
  ];

  const genders = ["Male", "Female", "Other"];

  const handleRoleToggle = (role) => {
    setForm((prevForm) => {
      const updatedRoles = prevForm.roles.includes(role)
        ? prevForm.roles.filter((r) => r !== role)
        : [...prevForm.roles, role];

      return { ...prevForm, roles: updatedRoles };
    });
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      if (
        !form.email ||
        !form.password ||
        !form.confirmPassword ||
        !form.firstName ||
        !form.lastName ||
        !form.gender ||
        form.roles.length === 0
      ) {
        Toast.show({
          type: "error",
          text1: "Validation Error",
          text2: "All fields are required.",
        });
        setLoading(false);
        return;
      }

      if (form.password !== form.confirmPassword) {
        Toast.show({
          type: "error",
          text1: "Password Mismatch",
          text2: "Passwords do not match.",
        });
        setLoading(false);
        return;
      }

      await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        gender: form.gender,
        roles: form.roles,
      });

      Toast.show({
        type: "success",
        text1: "Registration Successful",
        text2: "You can now log in.",
      });

      navigation.navigate("Auth");
    } catch (error) {
      console.error("Registration failed:", error);
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: error.message || "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <KeyboardAwareScrollView>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Sign Up to</Text>
            <Text style={styles.appName}>FreeDevelopersCamp</Text>
          </View>

          {/* Sign up with Google or Facebook */}
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialText}>Sign up with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialText}>Sign up with Facebook</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider}>
            <Text>or</Text>
          </View>

          <View style={styles.form}>
            {/* First Name */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                style={styles.inputControl}
                placeholder="First Name"
                value={form.firstName}
                onChangeText={(firstName) => setForm({ ...form, firstName })}
              />
            </View>

            {/* Last Name */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                style={styles.inputControl}
                placeholder="Last Name"
                value={form.lastName}
                onChangeText={(lastName) => setForm({ ...form, lastName })}
              />
            </View>

            {/* Email */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.inputControl}
                placeholder="Email"
                value={form.email}
                onChangeText={(email) => setForm({ ...form, email })}
              />
            </View>

            {/* Password */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.inputControl}
                placeholder="Password"
                value={form.password}
                onChangeText={(password) => setForm({ ...form, password })}
              />
            </View>

            {/* Confirm Password */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.inputControl}
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChangeText={(confirmPassword) =>
                  setForm({ ...form, confirmPassword })
                }
              />
            </View>

            {/* Gender Selection */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Gender</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={form.gender}
                  onValueChange={(itemValue) =>
                    setForm({ ...form, gender: itemValue })
                  }
                >
                  {genders.map((gender, index) => (
                    <Picker.Item key={index} label={gender} value={gender} />
                  ))}
                </Picker>
              </View>
            </View>
            {/* Role Selection */}
            <Text style={styles.label}>Select Roles</Text>
            <View style={styles.rolesContainer}>
              {roleOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => handleRoleToggle(option.value)}
                  style={[
                    styles.roleOption,
                    form.roles.includes(option.value) && styles.selectedRole,
                  ]}
                >
                  <Text style={styles.roleText}>
                    {form.roles.includes(option.value) ? "✅" : "⬜"}{" "}
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity onPress={handleSignUp} disabled={loading}>
              <View style={[styles.btn, { opacity: loading ? 0.5 : 1 }]}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.btnText}>Sign up</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    marginTop: 30,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
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
  divider: {
    fontSize: 16,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 10,
    width: 190,
  },
  socialButton: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  socialText: {
    fontSize: 16,
  },
  input: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  inputControl: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#555",
    backgroundColor: "#999",
    borderRadius: 8,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: "#075eec",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
  },
  rolesContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  roleOption: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  selectedRole: {
    backgroundColor: "#d1e7ff",
  },
});
