import React from "react";
import { getDefaultPrivacyValue } from "../../tools/toolPosts";
import Icon from "./Icon";

export default function PrivacyIcon({ privacy, className, ...props }) {
  return (
    <Icon {...props} className={className}>
      {getDefaultPrivacyValue(privacy)?.[1]}
    </Icon>
  );
}
