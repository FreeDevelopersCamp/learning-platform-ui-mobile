import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";

const TestScreen = () => {
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch("http://192.168.88.4:3030/api/v1/Auth/roles", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "x-tenant-id": "b_1",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Request failed with status ${response.status}`);
        }
      })
      .then((data) => {
        console.log("Data received:", data);
        Toast.show({
          type: "success",
          text1: "Request Successful",
          text2: "Data fetched successfully.",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        Toast.show({
          type: "error",
          text1: "Request Failed",
          text2: error.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="medium" color="gray" style={styles.loader} />
      ) : (
        <>
          <Text style={styles.text}>zzzzzzzzzz</Text>
          <Button title="Send Request" onPress={fetchData} disabled={loading} />
          <Toast />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  },
});

export default TestScreen;
