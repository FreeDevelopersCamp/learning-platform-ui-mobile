import { useQuery } from "@tanstack/react-query";
import { ToastAndroid } from "react-native";

import { User } from "../../apis/user/User";

export function useGetUser(username, token) {
  const {
    isLoading: userLoading,
    data: user,
    error: userError,
  } = useQuery({
    queryKey: ["user", username],
    queryFn: () => User.getByUserName(username, {}, token),
    enabled: !!username, // Ensure the query only runs if username is provided
    keepPreviousData: true,
    onError: (error) => {
      const errorMessage = error.message || "Failed to fetch user";
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    },
  });

  if (!username) {
    return {
      isLoading: false,
      user: null,
      error: null,
    };
  }

  return {
    isLoading: userLoading,
    error: userError,
    user,
  };
}
