import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

export const useRoles = () => {
  const navigation = useNavigation();

  const navigateToRoleDashboard = useCallback(
    (role) => {
      if (!role) {
        console.error("❌ Error: No role provided to useRoles function.");
        return;
      }

      const routesMap = {
        0: "MainDashboard",
        1: "MainDashboard",
        2: "MainDashboard",
        3: "MainDashboard",
        4: "MainDashboard",
        5: "MainDashboard",
        6: "Dashboard",
      };

      const routeName = routesMap[role] || "Auth";

      navigation.reset({
        index: 0,
        routes: [{ name: routeName }],
      });
    },
    [navigation]
  );

  return { navigateToRoleDashboard };
};
