import React from "react";

const Badge = ({ value, divClass, ...props }) => {
  if (value == 0 || !value) {
    return null;
  }
  return (
    <div {...props} className={" relative  z-10  " + props?.divClass}>
      <div
        className={
          "absolute -top-3 -right-2 ring-1 dark:ring-0 ring-white flex aspect-square bg-pink-400 text-white rounded-full items-center justify-center max-w-[18px] min-w-[18px] max-h-[18px] text-sm min-h-[18px] " +
          props?.className
        }
      >
        <small className="text-[13px] font-semibold">{value}</small>
      </div>
    </div>
  );
};

export default Badge;
