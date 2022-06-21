import { useState } from "react";
import Box from "./Box";
import Icon from "./Icon";



export default function Option({ icon = 'more_horiz', options }) {
    const [open,setOpen] = useState(false)
    
    const x = [
        { text: 'delete', action: () => { } },
        { text: 'edit', action: () => { } },
    ]
    
  return (
      <div className="">
          <button onClick={_=>setOpen(true)}>
              <Icon>{ icon}</Icon>
          </button>
         {open && <span className="relative">
              
              <div onMouseLeave={_ => setOpen(false)}
                  className="absolute z-50 top-0 right-0 p-2">
              <Box className='ring-1 ring-gray-100 flex-col flex z-50 bg-white shadow-md p-0 py-2 overflow-hidden'>
                      {
                          options?.map(option => (
                              <span onClick={option?.action} className="flex-1 text-center cursor-pointer hover:text-gray-700 p-1 hover:bg-gray-100 px-6"
                                  key={ Math.random()}
                              >
                                  {option?.text }
                              </span>
                          ))
                      }
              </Box>
          </div>
          </span>}
          
    </div>
  )
}
