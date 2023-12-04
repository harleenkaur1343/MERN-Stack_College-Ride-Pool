import {useState, useContext} from 'react'
import { useAuthContest } from './useAuthContext'


export const useLogin = () =>{
    const [error, setError] = useState(null)
    const[isLoading, setIsLoading] = useState(null)
    const {dispatch,isAuthenticated,setIsAuthenticated} = useAuthContest()
    


    const login = async (email,urn,password) =>{
        setIsLoading(true);
        setError(null);

        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({email,urn,password})
        })
        const json = await response.json()

        if(!response.ok)
        {
            //response is not loading 
            setIsLoading(false)
            console.log(json.error)
            setError(json.error)
        }
        if(response.ok)
        {
            // take json token and store it in the browser is by saving it to the local storage 
            localStorage.setItem("user",JSON.stringify(json))
            setIsAuthenticated(true);
            //update the auth context with user returned 
            dispatch({type:'LOGIN', payload:json})
            setIsLoading(false)
        }
        return json.error;
    }

    return {login,isLoading,error}
}
