import IconBtn from "./IconBtn";

export default function Modal({ open, set, children, div, className }) {
  if (!open) return null;
  return (
    <div
      onClick={(_) => set(false)}
      className={
        " flex z-50 flex-col items-center justify-center bg-gray-900 bg-opacity-60 backdrop-blur-md fixed top-0 left-0 w-full h-full overflow-auto overscroll-none " +
        className
      }
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={" relative animate-pop " + div}
      >
        <IconBtn
          onClick={(_) => set(false)}
          className="absolute -top-5 right-2"
        >
          close
        </IconBtn>
        {children}
      </div>
    </div>
  );
}
