import { useRef } from "react"


export default function ImgInput({set,children,name ='imgs',single,onInput=()=>{}}) {
  const ref = useRef()

    function onInputHandler(e) {
      const files = Array.from(e.target?.files)?.map(y =>
        ({ url: URL.createObjectURL(y), file: y }))
      
      set({ [name]: files })
      onInput(files)
    }
    
    function reclick() {
        ref?.current?.click()
    }

    return (
        <div onClick={reclick}>
        <input ref={ref} hidden multiple={ single ? false : 'on'} onInput={onInputHandler} type='file' />
            {children}
        </div>
      )
  
}
  

