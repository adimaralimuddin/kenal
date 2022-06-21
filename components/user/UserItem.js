import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../firebase.config"
import Avatar from "../elements/Avatar"



export default function UserItem({ userId,children,noName,className }) {
    const [data,setData] = useState()

    useEffect(() => {
        if (userId) {
            getData()
        }
    }, [userId])
    
    async function getData() {
        const user = await getDoc(doc(db, 'users', userId))
        setData(user?.data())
    }

  return (
      <div className={"flex items-center p-2 " + className}>
          <Avatar src={data?.avatar} />
          <div className=" ml-2 flex flex-col justify-start">
              {!noName &&<h2>{data?.userName}</h2>}
              {children}
          </div>
    </div>
  )
}


