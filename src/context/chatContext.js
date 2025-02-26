import { createContext, useState, useEffect } from "react";
import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js"

export const ChatContext = createContext(null)

const ChatProvider = ({children}) => {
    const token = localStorage.getItem('data')
    const parse = JSON.parse(token)
    // console.log(parse.token)
    const authHeader = {
      auth: {
        token: `Bearer ${parse.token}`
      }
    }

      const [namespace,setNamespace] = useState([])
      const [ endPoint, setEndPoint ] = useState('')
      const [friendList, setFriendList] = useState('')
      const [BASE_URL,setBASE_URL] = useState(process.env.REACT_APP_BACKEND_HOST);

      useEffect(()=> {
        const socket = io(BASE_URL,authHeader)
        // console.log(authHeader)
    
        socket.on('endPoint',(endPoint)=> {
          setEndPoint(endPoint)
          namespace[endPoint] = io(`${BASE_URL}/${endPoint}`)
          console.log(endPoint)
          namespace[endPoint].on('getFriendList',(friendList, callback)=> {
            console.log('friendlist',friendList)
            setFriendList(friendList)
            callback({message:'list received'})
          })
        }) 
      },[])
   
    // console.log(userDetails.token)
    return (
        <ChatContext.Provider value={{namespace,setNamespace,endPoint,friendList}}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider