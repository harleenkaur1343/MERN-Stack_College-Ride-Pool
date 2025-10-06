import { useState, useContext } from "react";
import { useAuthContest } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContest();
  const { isAuthenticated, setIsAuthenticated } = useAuthContest();

  const signup = async (
    name,
    email,
    phone,
    urn,
    location,
    password,
    branch,
    year,
    ridetype,
    role
  ) => {
    setIsLoading(true);
    setError(null);
    //testing
//     console.log("Sending payload:", {
//   name, email, phone, urn, location, password, branch, year, ridetype, role
// });
    
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          urn,
          location,
          password,
          branch,
          year,
          ridetype,
          role,
        }),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      //response is not loading
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // take json token and store it in the browser is by saving it to the local storage
      localStorage.setItem("user", JSON.stringify(json));
      setIsAuthenticated(true);
      //update the auth context with user returned
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};


