import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import config from "../config/config";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const isLoggedIn = !!token;

    const setTokenInLocalStore = (token) => {
        setToken(token);
        return localStorage.setItem("token",token);
    }

    // logout 
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    }

    const getCurrentUser = async () => {
        try {
            const res = await axios.get(
                `${config.BASEURL}/auth/currentUser`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setUser(res.data.data);
            setIsLoading(false);
        } catch (error) {
            // console.log("error",error.response.data.message);
            console.log(`Error in currentUser api call: ${error}`);
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            getCurrentUser();
        }else{
            setUser({});
        }
    }, [isLoggedIn]);
    

    return (
        <AuthContext.Provider value={{
            setTokenInLocalStore,
            LogoutUser,
            isLoggedIn,
            user,
            token,
            isLoading,
            }}>{children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}