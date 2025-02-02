import { useQuery } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import Profile from "../../apis/profile/Profile";

export function useGetProfile(username) {
  return useQuery({
    queryKey: ["profile", username],
    queryFn: () => Profile.getByUserName(username),
    enabled: !!username, // Ensure it only runs when username is available
    keepPreviousData: true,
    onError: () =>
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch profile",
        visibilityTime: 3000,
      }),
  });
}
