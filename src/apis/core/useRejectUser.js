import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { getServiceInstanceByRole } from "./useRoleData";

export function useRejectUser() {
  const queryClient = useQueryClient();

  const { isLoading: isRejecting, mutate: rejectUser } = useMutation({
    mutationFn: async (user) => {
      const serviceInstance = getServiceInstanceByRole(user.role);
      if (!serviceInstance) {
        throw new Error(`No service instance found for role: ${user.role}`);
      }
      return await serviceInstance.reject(user.roleId);
    },
    onSuccess: () => {
      Alert.alert("Success", "User successfully rejected");
      queryClient.invalidateQueries({ queryKey: ["users", "role"] });
    },
    onError: (err) => {
      console.error("Rejection error:", err);
      Alert.alert("Error", "You are not authorized to reject this user");
    },
  });

  return { isRejecting, rejectUser };
}
