import {useState, useContext} from 'react'
import { useAuthContest } from './useAuthContext';

export const useLogout = ()=>{
    const {dispatch} = useAuthContest()
    const { isAuthenticated,setIsAuthenticated} = useAuthContest()

    const logout = () => {
    //remove the token from the local storage 
    localStorage.removeItem('user');
    setIsAuthenticated(false)

    //set global state to logout 
        dispatch({type:'LOGOUT'})
    }
    return {logout};
}
