import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";

import { useListUser } from "../../apis/core/useListUser";
import { useApproveUser } from "../../apis/core/useApproveUser";
import { useRejectUser } from "../../apis/core/useRejectUser";
import { useDeleteUser } from "../../apis/core/useDeleteUser";
import { useDeactivateUser } from "../../apis/core/useDeactivateUser";
import { useVerifyInstructor } from "../../apis/core/useVerifyInstructor";

const UserSelectionContext = createContext();

export const useUserSelection = () => {
  return useContext(UserSelectionContext);
};

export const UserSelectionProvider = ({ children }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { users, isLoading } = useListUser();
  const { isApproving, approveUser } = useApproveUser();
  const { isRejecting, rejectUser } = useRejectUser();
  const { isDeactivating, deactivateUser } = useDeactivateUser();
  const { isDeleting, deleteUser } = useDeleteUser();
  const { isVerifying, verifyInstructor } = useVerifyInstructor();

  const handleSelectUser = (roleId) => {
    setSelectedUsers((prev) =>
      prev.includes(roleId)
        ? prev.filter((userId) => userId !== roleId)
        : [...prev, roleId]
    );
  };

  const handleSelectAllUsers = (users, isSelected) => {
    setSelectedUsers(isSelected ? users.map((user) => user.roleId) : []);
  };

  const handleUserAction = async (action) => {
    const userMap = new Map(users.map((user) => [user.roleId, user]));

    await Promise.all(
      selectedUsers.map(async (userId) => {
        const user = userMap.get(userId);
        if (user) {
          switch (action) {
            case "approve":
              return approveUser(user);
            case "reject":
              return rejectUser(user);
            case "delete":
              return deleteUser(user);
            case "deactivate":
              return deactivateUser(user);
            case "verify":
              return verifyInstructor(user);
            default:
              Alert.alert("Error", `Unknown action: ${action}`);
          }
        }
      })
    );
    setSelectedUsers([]);
  };

  return (
    <UserSelectionContext.Provider
      value={{
        selectedUsers,
        setSelectedUsers,
        handleSelectUser,
        handleSelectAllUsers,
        handleUserAction,
      }}
    >
      {children}
    </UserSelectionContext.Provider>
  );
};
