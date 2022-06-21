


export default function ButtonPrim(props) {
  return (
      <button {...props} className={`bg-blue-500 text-white my-3 hover:bg-blue-600 px-5 `}>{ props?.children}</button>
  )
}
