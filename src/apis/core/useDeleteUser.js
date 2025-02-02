import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { getServiceInstanceByRole } from "./useRoleData";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteUser } = useMutation({
    mutationFn: async (user) => {
      const serviceInstance = getServiceInstanceByRole(user.role);
      if (!serviceInstance) {
        throw new Error(`No service instance found for role: ${user.role}`);
      }
      return await serviceInstance.delete(user.roleId);
    },
    onSuccess: () => {
      Alert.alert("Success", "User successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["users", "role"] });
    },
    onError: (err) => {
      console.error("Deletion error:", err);
      Alert.alert("Error", "You are not authorized to delete this user");
    },
  });

  return { isDeleting, deleteUser };
}
