import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { getServiceInstanceByRole } from "./useRoleData";

export function useVerifyInstructor() {
  const queryClient = useQueryClient();

  const { isLoading: isVerifying, mutate: verifyInstructor } = useMutation({
    mutationFn: async (user) => {
      const serviceInstance = getServiceInstanceByRole(user.role);
      if (!serviceInstance) {
        throw new Error(`No service instance found for role: ${user.role}`);
      }
      return await serviceInstance.verifyInstructor(user.roleId);
    },
    onSuccess: () => {
      Alert.alert("Success", "Instructor successfully verified");
      queryClient.invalidateQueries({ queryKey: ["users", "role"] });
    },
    onError: (err) => {
      console.error("Verification error:", err);
      Alert.alert("Error", "You are not authorized to verify this instructor");
    },
  });

  return { isVerifying, verifyInstructor };
}
