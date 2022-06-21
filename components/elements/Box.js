

export default function Box(props) {
  return (
    <div {...props} className={` bg-white p-3 rounded-md m-2 ` + props?.className}>{props?.children}</div>
  )
}
