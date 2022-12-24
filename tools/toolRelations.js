export function isFollowing(userId, relations) {
  if (relations?.followings?.find((p) => p == userId)) {
    return true;
  } else {
    return false;
  }
}
