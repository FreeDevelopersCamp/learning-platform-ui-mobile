import { useQuery } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import Admin from "../roles/Admin";
import Owner from "../roles/Owner";
import Manager from "../roles/Manager";
import AccountManager from "../roles/AccountManager";
import ContentManager from "../roles/ContentManager";
import Instructor from "../roles/Instructor";
import Learner from "../roles/Learner";

// ✅ Generic Hook for Fetching User Data by Role
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

// ✅ Function to Get Service Instance by Role
export const getServiceInstanceByRole = (role) => {
  switch (role) {
    case "0":
      return Admin.getInstance();
    case "1":
      return Owner.getInstance();
    case "2":
      return Manager.getInstance();
    case "3":
      return AccountManager.getInstance();
    case "4":
      return ContentManager.getInstance();
    case "5":
      return Instructor.getInstance();
    case "6":
      return Learner.getInstance();
    default:
      console.error(`Unknown role: ${role}`);
      return null;
  }
};

// ✅ Specific Hooks for Each Role
export function useAdmin(userId) {
  return useRoleData("admin", Admin.getInstance(), userId);
}

export function useOwner(userId) {
  return useRoleData("owner", Owner.getInstance(), userId);
}

export function useManager(userId) {
  return useRoleData("manager", Manager.getInstance(), userId);
}

export function useAccountManager(userId) {
  return useRoleData("account-manager", AccountManager.getInstance(), userId);
}

export function useContentManager(userId) {
  return useRoleData("content-manager", ContentManager.getInstance(), userId);
}

export function useInstructor(userId) {
  return useRoleData("instructor", Instructor.getInstance(), userId);
}

export function useLearner(userId) {
  return useRoleData("learner", Learner.getInstance(), userId);
}
