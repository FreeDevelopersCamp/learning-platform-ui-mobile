import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import Course from "../../apis/course/Course";

// Fetch Course by ID
export function useFetchCourseById(courseId) {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      const course = await new Course().getById(courseId);
      return course;
    },
    enabled: !!courseId, // Only fetch when courseId is provided
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Error Fetching Course",
        text2: error?.message || "Failed to load course data",
      });
    },
  });
}

// Create Course
export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newCourse) => {
      const response = await new Course().create(newCourse);
      return response;
    },
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Course Created Successfully" });
      queryClient.invalidateQueries(["courseList"]); // Refetch course list
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Error Creating Course",
        text2: error?.message || "Unable to create course",
      });
    },
  });
}

// Update Course
export function useUpdateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedCourse) => {
      const response = await new Course().update(updatedCourse);
      return response;
    },
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Course Updated Successfully" });
      queryClient.invalidateQueries(["course"]);
      queryClient.invalidateQueries(["courseList"]); // Refetch the course list
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Error Updating Course",
        text2: error?.message || "Unable to update course",
      });
    },
  });
}

// Delete Course
export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await new Course().delete(id);
      return response;
    },
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Course Deleted Successfully" });
      queryClient.invalidateQueries(["courseList"]); // Refetch course list
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Error Deleting Course",
        text2: error?.message || "Unable to delete course",
      });
    },
  });
}
