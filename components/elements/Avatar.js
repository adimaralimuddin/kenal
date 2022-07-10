import Image from "next/image";

export default function Avatar(props) {
  if (!props?.src) return null;
  const { size = 40 } = props;
  return (
    <div
      style={{
        minWidth: size,
        minHeight: size,
      }}
      className={
        " m-1d rounded-lg overflow-hidden flex items-center m-1 " + props?.div
      }
    >
      <Image
        {...props}
        className={"rounded-lgd " + props?.className}
        width={size}
        height={size}
      />
    </div>
  );
}
