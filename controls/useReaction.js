import { toolArrayRemove, toolArrayUnion } from "./toolArrayDb"


export default function useReaction() {
            

    async function like(docId, userId, likes,col_) {
        if (likes?.find(i=>i==userId)) {
            toolArrayRemove(col_,docId,'likes',userId)
        } else {
            toolArrayUnion(col_,docId,'likes',userId)
        }
    }
  
    async function love(docId, userId, likes,col_) {
        if (likes?.find(i=>i==userId)) {
            toolArrayRemove(col_,docId,'loves',userId)
        } else {
            toolArrayUnion(col_,docId,'loves',userId)
        }
    }
    
    return {
        like,love
    }
}


