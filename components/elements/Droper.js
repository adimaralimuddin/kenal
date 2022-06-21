

export default function Droper(props) {
    if (!props?.open) return null;
    return (
        <span className="relative">
              <div onMouseLeave={_=>props?.set(false)} className="ring-1d absolute top-0 right-0 pt-12">
                  <div  onClick={_=>props?.set(false)} className="flex flex-col bg-white p-5 shadow-md rounded-md whitespace-nowrap ring-1d">
                    { props?.children}
              </div>
              </div>
          </span>
    )
}