import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  initializeSocket,
  disconnectSocket,
} from "../hooks/communication/Message/socket";
import { groupMessagesByDate, formatTime } from "../utils/helpers";

const ChatContainer = () => {
  const route = useRoute();
  const { selectedUser, currentUser } = route.params;
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const scrollViewRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!selectedUser || !currentUser) {
      console.error("❌ Missing selectedUser or currentUser");
      return;
    }

    const connectSocket = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.error("❌ No token found.");
          Toast.show({
            type: "error",
            text1: "Authentication Error",
            text2: "No authentication token found. Please log in again.",
            visibilityTime: 3000,
          });
          return;
        }

        const socket = await initializeSocket({
          tenantId: "b_1",
          userId: currentUser?._id,
        });

        if (!socket) {
          console.error("❌ WebSocket not initialized.");
          Toast.show({
            type: "error",
            text1: "Connection Error",
            text2: "Failed to connect to WebSocket.",
            visibilityTime: 3000,
          });
          return;
        }

        socketRef.current = socket;

        socket.on("connect", () => {
          console.log("✅ Connected to WebSocket:", socket.id);
          socket.emit(
            "getMessages",
            { senderId: currentUser?._id, receiverId: selectedUser?._id },
            (initialMessages) => {
              console.log("✅ Received Messages:", initialMessages);
              if (initialMessages) setMessages(initialMessages);
            }
          );
        });

        socket.on("newMessage", (message) => {
          console.log("📩 New Message:", message);
          setMessages((prevMessages) => [...prevMessages, message]);
        });

        socket.on("connect_error", (error) => {
          console.error("❌ WebSocket connection error:", error.message);
          Toast.show({
            type: "error",
            text1: "WebSocket Error",
            text2: "Failed to connect. Retrying...",
            visibilityTime: 3000,
          });

          setTimeout(() => connectSocket(), 5000); // Auto-reconnect after 5 seconds
        });
      } catch (error) {
        console.error("❌ Error connecting WebSocket:", error);
      }
    };

    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, [selectedUser, currentUser]);

  const handleSendMessage = () => {
    if (!messageContent.trim() || !socketRef.current) return;

    const newMessage = {
      senderId: currentUser?._id,
      receiverId: selectedUser?._id,
      content: messageContent,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    socketRef.current.emit("sendMessage", newMessage, (ackMessage) => {
      if (ackMessage) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.timestamp === newMessage.timestamp ? ackMessage : msg
          )
        );
      }
    });

    setMessageContent("");
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        style={styles.chatContainer}
      >
        <View style={styles.innerContainer}>
          <FlatList
            ref={scrollViewRef}
            data={Object.entries(groupMessagesByDate(messages))}
            keyExtractor={(item) => item[0]}
            renderItem={({ item }) => {
              const [date, messages] = item;
              return (
                <View>
                  <View style={styles.dateHeader}>
                    <Text style={styles.dateText}>{date}</Text>
                  </View>
                  {messages.map((msg, index) => {
                    const isSender = msg.senderId === currentUser?._id;
                    return (
                      <View
                        key={index}
                        style={[
                          styles.messageWrapper,
                          isSender ? styles.sender : styles.receiver,
                        ]}
                      >
                        <Text style={styles.messageText}>{msg.content}</Text>
                        <Text style={styles.messageTime}>
                          {formatTime(msg.timestamp)}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              );
            }}
            contentContainerStyle={{ flexGrow: 1 }}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }
          />

          <View style={styles.messageInputContainer}>
            <TextInput
              style={styles.messageInput}
              placeholder="Type a message..."
              value={messageContent}
              onChangeText={setMessageContent}
              onSubmitEditing={handleSendMessage}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendMessage}
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  innerContainer: {
    flex: 1,
    paddingBottom: 80, // ✅ Increased padding to separate messages from input
  },
  dateHeader: {
    alignSelf: "center",
    backgroundColor: "#e6eaf0",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  messageWrapper: {
    marginBottom: 10,
    padding: 12,
    borderRadius: 10,
    maxWidth: "80%",
  },
  sender: {
    alignSelf: "flex-end",
    backgroundColor: "#d1f7d6",
  },
  receiver: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f1f1",
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: "gray",
    alignSelf: "flex-end",
    marginTop: 5,
  },
  messageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderColor: "#ddd",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    marginBottom: 20,
  },
  messageInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#075eec",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ChatContainer;
