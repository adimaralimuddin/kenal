



export default function Icon(props) {
  return (
    <span className={"text-gray-400 m-1 material-icons " + props?.className}>
{props?.children}
          </span>
  )
}
