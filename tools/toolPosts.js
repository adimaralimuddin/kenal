export function getDefaultPrivacyValue(defaultValue) {
  switch (defaultValue) {
    case "Public":
      return [defaultValue, "earth"];
    case "Followers":
      return [defaultValue, "user-smile"];
    case "Only_me":
      return [defaultValue, "lock-2"];
    default:
      return ["Public", "earth"];
  }
}
