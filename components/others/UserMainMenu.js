import { useState } from "react"
import useUser from "../../controls/useUser"
import Avatar from "../elements/Avatar"
import ButtonPrim from "../elements/ButtonPrim"
import ButtonSec from "../elements/ButtonSec"
import Droper from "../elements/Droper"



export default function UserMainMenu() {
    const { user,logout,loginWithGoogle } = useUser()
    const [open, setOpen] = useState(false)
    const [openLog,setOpenLog] = useState(false)
    console.log(user)
  return (
      <div className="flex">
          {user && <div onMouseEnter={_ => setOpen(true)} className="min-w-[40px] max-w-[40px]">
              <Avatar src={ user?.photoURL} width={30} height={30}/>
          </div>}
       
        <Droper open={open} set={setOpen}>
                      <button className="hover:text-gray-600">
                        <h3>My Profile</h3>
                     </button>
                      <button className="hover:text-gray-600">
                        <h3>Settings</h3>
                     </button>
                      <button onClick={logout} className="hover:text-gray-600">
                        <h3>Logout</h3>
                     </button>
          </Droper>

          {!user && <div onMouseEnter={_=>setOpenLog(true)}>
          <button>Login</button>
          </div>}

         <Droper open={openLog} set={setOpenLog} className="relative">
             
                      <h2>Login</h2>
                      <input placeholder="email"/>
                      <input placeholder="password" />
                      <ButtonPrim>Login</ButtonPrim>
                      <hr />
                      <ButtonSec onClick={loginWithGoogle}>Signin With Google</ButtonSec>
              
           
          </Droper>
    </div>
  )
}

