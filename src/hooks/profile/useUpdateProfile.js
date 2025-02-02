import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import Profile from "../../apis/profile/Profile";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation(
    async (data) => {
      return await Profile.update(data); // Ensure `update` is correctly referenced
    },
    {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Profile updated successfully",
          visibilityTime: 3000,
        });

        queryClient.invalidateQueries(["profile"]);
      },
      onError: (error) => {
        console.error("Error updating profile:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to update profile",
          visibilityTime: 3000,
        });
      },
    }
  );
}
