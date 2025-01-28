import { useQuery } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import Admin from "../admin/Admin";
import Instructor from "../instructor/Instructor";
import Learner from "../learner/Learner";

// Generic hook for fetching user data by role
function useRoleData(roleKey, serviceInstance, userId) {
  return useQuery({
    queryKey: [roleKey, userId],
    queryFn: () => serviceInstance.getByUserId(userId),
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: `Failed to fetch data for role: ${roleKey}`,
        visibilityTime: 3000,
      });
    },
  });
}

// Function to get the appropriate service instance based on role
export const getServiceInstanceByRole = (role) => {
  switch (role) {
    case "0":
      return new Admin();
    case "5":
      return new Instructor();
    case "6":
      return new Learner();
    default:
      console.error(`Unknown role: ${role}`);
      return null;
  }
};

// Specific hooks for each role
export function useAdmin(userId) {
  return useRoleData("admin", new Admin(), userId);
}

export function useInstructor(userId) {
  return useRoleData("instructor", new Instructor(), userId);
}

export function useLearner(userId) {
  return useRoleData("learner", new Learner(), userId);
}
