import Image from "next/image";

export default function Avatar(props) {
  const { size = 40, userName, ...imageProps } = props;
  return (
    <div
      {...imageProps}
      style={{
        minWidth: size,
        minHeight: size,
      }}
      className={
        "relative m-1d rounded-xl overflow-hidden flex items-center m-1 min-w-[35px] min-h-[35px] w-[34px] aspect-square text-center ring-2d " +
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
        <div>
          {props?.src}
          <Image
            src={props?.src || ""}
            className={" bg-cover bg-center " + props?.className}
            layout="fill"
            objectFit="cover"
            alt={""}
          />
        </div>
      )}
    </div>
  );
}
