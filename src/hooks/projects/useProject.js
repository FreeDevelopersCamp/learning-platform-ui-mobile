import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Project from "../../apis/project/project";
import Toast from "react-native-toast-message";

// Fetch all projects with pagination
export function useFetchProjectList(page = 1, limit = 10) {
  return useQuery({
    queryKey: ["projectList", page, limit],
    queryFn: () =>
      new Project().list({
        params: {
          page,
          limit,
        },
      }),
    onError: () =>
      Toast.show({ type: "error", text1: "Failed to fetch project list" }),
  });
}

// Fetch a project by ID
export function useFetchProjectById(projectId) {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => new Project().getById(projectId),
    enabled: !!projectId, // Query runs only when projectId is defined
    onError: () =>
      Toast.show({ type: "error", text1: "Failed to fetch project data" }),
  });
}

// Create a new project
export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newProject) => new Project().create(newProject),
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Project created successfully" });
      queryClient.invalidateQueries(["projectList"]);
    },
    onError: () =>
      Toast.show({ type: "error", text1: "Failed to create project" }),
  });
}

// Update an existing project
export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedProject) => new Project().update(updatedProject),
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Project updated successfully" });
      queryClient.invalidateQueries(["project"]);
      queryClient.invalidateQueries(["projectList"]);
    },
    onError: () =>
      Toast.show({ type: "error", text1: "Failed to update project" }),
  });
}

// Delete a project by ID
export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (projectId) => new Project().delete(projectId),
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Project deleted successfully" });
      queryClient.invalidateQueries(["projectList"]);
    },
    onError: () =>
      Toast.show({ type: "error", text1: "Failed to delete project" }),
  });
}
