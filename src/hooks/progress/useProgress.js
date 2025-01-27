import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import Progress from "../../apis/progress/Progress";

// Fetch Progress by ID
export function useFetchProgressById(progressId) {
  return useQuery({
    queryKey: ["progress", progressId],
    queryFn: async () => {
      const progress = await new Progress().getById(progressId);
      return progress;
    },
    enabled: !!progressId, // Only fetch when progressId is provided
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Error Fetching Progress",
        text2: error?.message || "Failed to load progress data",
      });
    },
  });
}

// Fetch Progress by User ID
export function useFetchProgressByUserId(userId) {
  return useQuery({
    queryKey: ["progressByUserId", userId],
    queryFn: async () => {
      const progress = await new Progress().getByUserId(userId);
      return progress;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Error Fetching User Progress",
        text2: error?.message || "Unable to load user progress data",
      });
    },
  });
}

// Create Progress
export function useCreateProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProgress) => {
      const response = await new Progress().create(newProgress);
      return response;
    },
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Progress Created Successfully" });
      queryClient.invalidateQueries(["progress"]); // Refetch progress data
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Error Creating Progress",
        text2: error?.message || "Unable to create progress",
      });
    },
  });
}

// Update Progress
export function useUpdateProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedProgress) => {
      const response = await new Progress().update(updatedProgress);
      return response;
    },
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Progress Updated Successfully" });
      queryClient.invalidateQueries(["progress"]); // Refetch progress data
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Error Updating Progress",
        text2: error?.message || "Unable to update progress",
      });
    },
  });
}

// Delete Progress
export function useDeleteProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await new Progress().delete(id);
      return response;
    },
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Progress Deleted Successfully" });
      queryClient.invalidateQueries(["progress"]); // Refetch progress data
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Error Deleting Progress",
        text2: error?.message || "Unable to delete progress",
      });
    },
  });
}
