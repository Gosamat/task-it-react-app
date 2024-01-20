import {useState, useEffect, createContext} from "react";
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api';
const AuthContext = createContext();

function AuthProviderWrapper(props){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  function storeToken(token){
    localStorage.setItem("authToken", token);
  }

  /* const authenticateUser =() =>{
    const storedToken = localStorage.getItem('authToken');

    if(storedToken){
      axios
      .get(`${API_URL}/auth/verify`, {
        headers: {Authorization: `Bearer ${storedToken}`},
      })
      .then((res)=>{
        const user = res.data;
        setIsLoggedIn(true);
        setUser(user);
        setIsLoading(false);
      })
      .catch(()=>{
        setIsLoggedIn(false);
        setUser(null);
        setIsLoading(false);
      });
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setIsLoading(false);
    }
  };
 */
  const authenticateUser = () => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      axios
        .get(`${API_URL}/users/userinfo`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((res) => {
          const user = res.data;
          setIsLoggedIn(true);
          setUser(user);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoggedIn(false);
          setUser(null);
          setIsLoading(false);
        });
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setIsLoading(false);
    }
  };
  

  useEffect(()=>{
    authenticateUser();
  }, []);

  const removeToken = ()=>{
    localStorage.removeItem("authToken");
  }

  const logOutUser= ()=>{
    removeToken();
    authenticateUser();
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user,API_URL, storeToken, authenticateUser, removeToken, logOutUser}}>
      {props.children}
    </AuthContext.Provider>
  );

}

export {AuthProviderWrapper, AuthContext};