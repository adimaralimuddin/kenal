import { useState } from "react";

const Comp = (Component, initialState) => (props) => {
  const { show = true } = props;
  const [loc, set_] = useState({ ...initialState, show });
  const set = (val) => {
    typeof val == "function"
      ? set_((p) => ({ ...p, ...val?.(loc) }))
      : set_((p) => ({ ...p, ...val }));
  };
  const key = (key) => {
    return (value) => set({ [key]: value });
  };

  if (!show) return null;
  return <Component state={{ ...loc, set, loc, key }} {...props} />;
};

export default Comp;

// export default function Comp(Component, initialState) {
//   const [loc, set_] = useState({ ...initialState, show });
//   return function (props) {
//     const { show = true } = props;
//     const set = (val) => {
//       typeof val == "function"
//         ? set_((p) => ({ ...p, ...val?.(loc) }))
//         : set_((p) => ({ ...p, ...val }));
//     };
//     const key = (key) => {
//       return (value) => set({ [key]: value });
//     };
//     if (!show) return null;
//     return <Component state={{ ...loc, set, loc, key }} {...props} />;
//   };
// }
