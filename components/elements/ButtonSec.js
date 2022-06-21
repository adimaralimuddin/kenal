

export default function ButtonSec(props) {
    return (
        <button {...props} className={`ring-1  text-gray-500 my-3 hover:ring-blue-600 hover:text-gray-600 `}>{ props?.children}</button>
    )
  }
  