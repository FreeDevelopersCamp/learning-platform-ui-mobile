import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { getServiceInstanceByRole } from "./useRoleData";

export function useApproveUser() {
  const queryClient = useQueryClient();

  const { isLoading: isApproving, mutate: approveUser } = useMutation({
    mutationFn: async (user) => {
      const serviceInstance = getServiceInstanceByRole(user.role);
      if (!serviceInstance) {
        throw new Error(`No service instance found for role: ${user.role}`);
      }
      return await serviceInstance.approve(user.roleId);
    },
    onSuccess: () => {
      Alert.alert("Success", "User successfully approved");
      queryClient.invalidateQueries({ queryKey: ["users", "role"] });
    },
    onError: (err) => {
      console.error("Approval error:", err);
      Alert.alert("Error", "You are not authorized to approve this user");
    },
  });

  return { isApproving, approveUser };
}
