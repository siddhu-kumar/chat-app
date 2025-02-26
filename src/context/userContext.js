import { createContext, useEffect, useState } from "react";
import { getUserData, isLoggedIn } from "../auth";
import { getAllUser } from "../services/user-service";
import { doLogout } from "../auth";
export const UserContext = createContext(null)

const DataProvider =  ({children}) => {
    const [auth,setAuth] = useState(isLoggedIn);
    const [userDetails,setUserDetails] = useState(getUserData)
    const [userList, setUserList] = useState('');
    const [reg, setReg] = useState(false);

    useEffect(()=> {
        if(auth) {
            getAllUser().then(data=> {
                setUserList(data)
            }).catch(error => {
                if(error.response.data.expire) {    
                    doLogout(); 
                    setUserList('');
                    setUserDetails('');
                    setAuth(isLoggedIn); 
                    // navigate('/login');
                }
                console.log(error.response.data)
            })
        }
    },[])
    

   useEffect(()=> {},[userList])
    // console.log(userDetails.token)
    return (
        <UserContext.Provider value={{auth, setAuth, userDetails, setUserDetails, userList, setUserList, reg, setReg}}>
            {children}
        </UserContext.Provider>
    )
}

export default DataProvider