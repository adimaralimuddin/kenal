





export default function IconBtn(props) {
    return (
      <button {...props} className={"text-gray-400 m-1 material-icons cursor-pointerf p-1 flex items-center justify-center bg-gray-100 hover:bg-gray-200 hover:text-gray-600 " + props?.className}>
  {props?.children}
            </button>
    )
  }
  
  