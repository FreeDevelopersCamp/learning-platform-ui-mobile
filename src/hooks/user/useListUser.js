import { useQuery } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import { User } from "../../apis/user/User";

export function useListUser() {
  // ✅ Fetch users
  const {
    isLoading: isUsersLoading,
    data: usersData = [], // Ensure it's always an array
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await User.list();
      return response?.items || [];
    },
    keepPreviousData: true,
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch users",
        visibilityTime: 3000,
      });
    },
  });

  // ✅ Fetch current user session
  const {
    isLoading: isSessionLoading,
    data: sessionData = null, // Default to null
    error: sessionError,
  } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const response = await User.listSession();
      return response || null;
    },
    keepPreviousData: true,
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch session",
        visibilityTime: 3000,
      });
    },
  });

  // ✅ Fetch active sessions
  const {
    isLoading: isSessionsLoading,
    data: sessionsData = [], // Default to empty array
    error: sessionsError,
  } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const response = await User.listSessions();
      return Array.isArray(response) ? response : [];
    },
    keepPreviousData: true,
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch sessions",
        visibilityTime: 3000,
      });
    },
  });

  return {
    isLoading: isUsersLoading || isSessionLoading || isSessionsLoading,
    error: usersError || sessionError || sessionsError,
    users: usersData,
    session: sessionData,
    sessions: sessionsData,
  };
}
