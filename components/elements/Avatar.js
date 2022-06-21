import Image from "next/image";


export default function Avatar(props) {
  if (!props?.src) return null;
  const { size=40} = props;
  return (
    <div
      style={{
        minWidth: size,
        minHeight:size,
      }}
      className={" m-1d rounded-md flex items-center m-1 " + props?.div}>

      <Image className="rounded-[6px]" {...props} width={size} height={ size} />
    </div>
  )
}
