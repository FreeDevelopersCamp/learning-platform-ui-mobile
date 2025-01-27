import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ProgressCircle } from "react-native-svg-charts"; // Ensure proper import for ProgressCircle
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const CustomRadioButton = ({ checked, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.radioButtonContainer}>
    <View
      style={[
        styles.radioButton,
        checked ? { backgroundColor: "blue" } : { backgroundColor: "white" },
      ]}
    >
      {checked && <View style={styles.radioButtonDot} />}
    </View>
  </TouchableOpacity>
);

const Exercises = ({ exercises }) => {
  const [answers, setAnswers] = useState([]);

  // Initialize answers if exercises are available
  useEffect(() => {
    if (exercises && exercises.length > 0) {
      const initialAnswers = exercises.map(() => ({
        selected: null,
        submitted: false,
        isCorrect: null,
      }));
      setAnswers(initialAnswers);
    }
  }, [exercises]);

  useEffect(() => {
    const loadAnswers = async () => {
      try {
        // Retrieve the stored answers
        const storedAnswers = await AsyncStorage.getItem("userAnswers");
        if (storedAnswers) {
          setAnswers(JSON.parse(storedAnswers));
        }
      } catch (error) {
        console.error("Failed to load answers", error);
      }
    };

    if (exercises && exercises.length > 0) {
      loadAnswers();
    }
  }, [exercises]);

  const handleOptionChange = async (index, selected) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].selected = selected;
    setAnswers(updatedAnswers);

    try {
      // Store the updated answers in AsyncStorage
      await AsyncStorage.setItem("userAnswers", JSON.stringify(updatedAnswers));
    } catch (error) {
      console.error("Failed to save answers", error);
    }
  };

  const handleSubmit = async (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].submitted = true;
    updatedAnswers[index].isCorrect =
      exercises[index].correctAnswer === `${updatedAnswers[index].selected}`;
    setAnswers(updatedAnswers);

    try {
      // Store the updated answers in AsyncStorage
      await AsyncStorage.setItem("userAnswers", JSON.stringify(updatedAnswers));
    } catch (error) {
      console.error("Failed to save answers", error);
    }
  };

  if (exercises.length === 0) {
    return <Text>No exercises available.</Text>;
  }

  return (
    <View style={styles.container}>
      {exercises.map((exercise, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.question}>
            Question {index + 1} of {exercises.length}
          </Text>
          <Text style={styles.description}>{exercise.question}</Text>
          <View style={styles.options}>
            {exercise.answers.map((answer, answerIndex) => (
              <View key={answerIndex} style={styles.option}>
                <View style={styles.optionContent}>
                  <CustomRadioButton
                    checked={answers[index]?.selected === answerIndex} // Ensure answers[index] exists
                    onPress={() => handleOptionChange(index, answerIndex)}
                  />
                  <Text>{answer}</Text>
                </View>
                {answers[index]?.submitted &&
                  answers[index]?.selected === answerIndex && (
                    <Icon
                      name={
                        answers[index]?.isCorrect
                          ? "checkmark-circle"
                          : "close-circle"
                      }
                      size={24}
                      color={answers[index]?.isCorrect ? "green" : "red"}
                    />
                  )}
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={[
              styles.submitButton,
              {
                backgroundColor: answers[index]?.submitted
                  ? "#4CAF50"
                  : "#075eec",
              },
            ]}
            onPress={() => handleSubmit(index)}
            disabled={
              answers[index]?.selected === null || answers[index]?.submitted
            }
          >
            <Text style={styles.submitButtonText}>
              {answers[index]?.submitted ? "Submitted!" : "Submit"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  questionContainer: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
  },
  options: {
    marginBottom: 16,
  },
  option: {
    marginBottom: 12,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  submitButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "blue",
  },
});

export default Exercises;
