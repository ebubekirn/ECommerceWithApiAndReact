import {createContext,useReducer} from 'react'

export const UserContext = createContext(
    {
        userList:[]
    }
)

function userReducer (State,action){
    switch(action.type){
        case "SET":
            const inverted = action.payload.reverse()
            return inverted
        default:
            return State
    }
}

function UserProvider ({children}){
    const [userState,dispatch]=useReducer(userReducer,[])
    function setUser(user){
        dispatch({type:'SET',payload:user})
    }
    const value = {
        users:userState,
        setUser:setUser,
    }
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider