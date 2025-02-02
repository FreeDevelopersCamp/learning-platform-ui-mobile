import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { User } from "../../apis/user/User";

// ✅ Fetch All Users
export function useListUser() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await User.list();
        return response?.items || [];
      } catch (error) {
        console.error("Error fetching users:", error);
        return [];
      }
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Error Fetching Users",
        text2: error?.message || "Failed to load user data",
      });
    },
  });
}

// ✅ Update User
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedUser) => {
      const response = await User.update(updatedUser);
      return response;
    },
    onSuccess: () => {
      Toast.show({ type: "success", text1: "User Updated Successfully" });
      queryClient.invalidateQueries(["users"]); // Refetch users list
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Error Updating User",
        text2: error?.message || "Unable to update user",
      });
    },
  });
}

// ✅ Delete User
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await User.delete(id);
      return response;
    },
    onSuccess: () => {
      Toast.show({ type: "success", text1: "User Deleted Successfully" });
      queryClient.invalidateQueries(["users"]); // Refetch users list
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Error Deleting User",
        text2: error?.message || "Unable to delete user",
      });
    },
  });
}
