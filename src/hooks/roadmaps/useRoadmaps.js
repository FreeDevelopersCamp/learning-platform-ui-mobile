import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import Roadmap from "../../apis/roadmap/Roadmap";

export function useFetchRoadmapById(roadmapId) {
  return useQuery({
    queryKey: ["roadmap", roadmapId],
    queryFn: async () => await Roadmap.getById(roadmapId),
    enabled: !!roadmapId,
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch roadmap data",
      });
    },
  });
}

export function useFetchRoadmapsByInstructorId(instructorId) {
  return useQuery({
    queryKey: ["roadmapByInstructor", instructorId],
    queryFn: async () => await Roadmap.listByInstructor(instructorId),
    enabled: !!instructorId,
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch roadmaps by instructor",
      });
    },
  });
}

export function useFetchRoadmapList() {
  return useQuery({
    queryKey: ["roadmapList"],
    queryFn: async () => await Roadmap.list(),
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch roadmap list",
      });
    },
  });
}

export function useCreateRoadmap() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newRoadmap) => await Roadmap.create(newRoadmap),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Roadmap created successfully",
      });
      queryClient.invalidateQueries(["roadmapList"]);
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to create roadmap",
      });
    },
  });
}

export function useUpdateRoadmap() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedRoadmap) => await Roadmap.update(updatedRoadmap),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Roadmap updated successfully",
      });
      queryClient.invalidateQueries(["roadmap"]);
      queryClient.invalidateQueries(["roadmapList"]);
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update roadmap",
      });
    },
  });
}

export function useDeleteRoadmap() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => await Roadmap.delete(id),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Roadmap deleted successfully",
      });
      queryClient.invalidateQueries(["roadmapList"]);
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to delete roadmap",
      });
    },
  });
}
