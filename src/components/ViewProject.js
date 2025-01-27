import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Button,
  ScrollView,
} from "react-native";
import { useFetchProjectById } from "../hooks/projects/useProject";

const ViewProject = ({ order }) => {
  const [hintsVisible, setHintsVisible] = useState({});
  const [tasksCompleted, setTasksCompleted] = useState([]);
  const [githubLink, setGithubLink] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const { data: project, isLoading, error } = useFetchProjectById(order.id);

  if (isLoading || !project || error) {
    return <ActivityIndicator size="large" color="#075eec" />;
  }

  const toggleHint = (index) => {
    setHintsVisible((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleTaskCompletion = (taskTitle) => {
    setTasksCompleted((prev) => [...prev, taskTitle]);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleGithubLinkChange = (event) => {
    setGithubLink(event.target.value);
  };

  const handleSubmitProject = () => {
    if (tasksCompleted.length < project.tasks.length) {
      alert("Please complete all tasks before submitting.");
      return;
    }

    if (!selectedFile && !githubLink) {
      alert("Please provide a GitHub link or upload a ZIP or RAR file.");
      return;
    }

    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
      // Add logic for file upload
    }

    if (githubLink) {
      console.log("GitHub link submitted:", githubLink);
      // Add logic for submitting GitHub link
    }

    alert("Project submitted successfully!");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{project.name}</Text>
        <Text style={styles.description}>{project.description}</Text>
      </View>

      <Text style={styles.sectionTitle}>Tasks</Text>
      {project.tasks.map((task, index) => (
        <View key={index} style={styles.taskContainer}>
          <Text style={styles.taskTitle}>
            {index + 1}) {task.title}
          </Text>
          <Text style={styles.taskDescription}>{task.description}</Text>

          {task.hints.length > 0 && (
            <View style={styles.hintsContainer}>
              <TouchableOpacity
                onPress={() => toggleHint(index)}
                style={styles.hintButton}
              >
                <Text style={styles.hintButtonText}>
                  {hintsVisible[index] ? "Hide Hints" : "Show Hints"}
                </Text>
              </TouchableOpacity>
              {hintsVisible[index] &&
                task.hints.map((hint, hintIndex) => (
                  <Text key={hintIndex} style={styles.hintText}>
                    Hint: {hint.description}
                  </Text>
                ))}
            </View>
          )}

          {/* <Button
            title="Mark Task as Completed"
            onPress={() => handleTaskCompletion(task.title)}
          /> */}
        </View>
      ))}

      <View style={styles.submitContainer}>
        <Text style={styles.inputLabel}>Upload ZIP or RAR File:</Text>
        <TextInput
          style={styles.fileInput}
          placeholder="Choose file"
          onChangeText={handleFileChange}
        />
        <Text style={styles.inputLabel}>GitHub Link:</Text>
        <TextInput
          style={styles.githubInput}
          value={githubLink}
          onChangeText={handleGithubLinkChange}
          placeholder="https://github.com/username/repo"
        />

        <TouchableOpacity
          onPress={handleSubmitProject}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>Submit Project</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure it takes full height
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  taskContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  taskDescription: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  hintsContainer: {
    marginTop: 10,
    paddingVertical: 5,
  },
  hintButton: {
    backgroundColor: "#075eec",
    padding: 8,
    borderRadius: 5,
    marginBottom: 5,
  },
  hintButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  hintText: {
    color: "#555",
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  fileInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  githubInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  submitContainer: {
    marginTop: 30,
    alignItems: "flex-start",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ViewProject;
