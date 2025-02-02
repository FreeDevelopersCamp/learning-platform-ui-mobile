import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { getServiceInstanceByRole } from "./useRoleData";

export function useDeactivateUser() {
  const queryClient = useQueryClient();

  const { isLoading: isDeactivating, mutate: deactivateUser } = useMutation({
    mutationFn: async (user) => {
      const serviceInstance = getServiceInstanceByRole(user.role);
      if (!serviceInstance) {
        throw new Error(`No service instance found for role: ${user.role}`);
      }
      return await serviceInstance.deactivate(user.roleId);
    },
    onSuccess: () => {
      Alert.alert("Success", "User successfully deactivated");
      queryClient.invalidateQueries({ queryKey: ["users", "role"] });
    },
    onError: (err) => {
      console.error("Deactivation error:", err);
      Alert.alert("Error", "You are not authorized to deactivate this user");
    },
  });

  return { isDeactivating, deactivateUser };
}
