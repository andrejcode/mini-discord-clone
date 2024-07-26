export function updateUsersBasedOnUserStatus(prevUsers, updatedUser) {
  return prevUsers.map(user => {
    if (user.userId === updatedUser.userId) {
      return {
        ...user,
        connected: updatedUser.connected,
      };
    } else {
      return user;
    }
  });
}
