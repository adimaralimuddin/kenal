import Image from "next/image";

export default function Avatar(props) {
  const { size = 40 } = props;
  return (
    <div
      style={{
        minWidth: size,
        minHeight: size,
      }}
      className={
        " m-1d rounded-lg overflow-hidden flex items-center m-1 min-w-[35px] min-h-[35px] w-[34px] aspect-square text-center " +
        props?.div
      }
    >
      {!props?.src && (
        <div className="flex flex-col h-full w-full text-center bg-gradient-to-r from-pink-400 to-pink-300 justify-center items-center ">
          <h2 className="font-semibold text-white">
            {props?.userName?.[0]?.toUpperCase?.()}
          </h2>
        </div>
      )}
      {props?.src && (
        <Image
          {...props}
          className={"rounded-md " + props?.className}
          width={size}
          height={size}
        />
      )}
    </div>
  );
}
