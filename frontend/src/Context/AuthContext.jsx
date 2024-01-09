import React from "react";
import { createContext, useState, useEffect} from "react";

   export const AuthDispatchContext = createContext();
   export const AuthStateContext = createContext();



   export function AuthProvider({ children }) {

      //default value of storedUser will be null if no data is found in localStorage
      // This is simply to make a mock authentication, in real scenarios, we would use backend and external services like firebase to assist in Auth
     const [storedUser, setStoredUser] = useState(() => {
        const localValue = localStorage.getItem("USER");
        if (localValue === null) return null;
    
        return JSON.parse(localValue);
      });

      //variable to check if any current form should be displayed. Options are "login", "sign up", "profile" and "". In real scenarios, would use something like react-router-dom and pages to display auth screens and restrict users from using other screens, e.g not be able to access sign up if already logged-in.
     const [currentForm, setCurrentForm] = useState("");

     //States for user details
     const [username, setUsername] =useState("");
     const [pass, setPass] =useState("");

     //State for the current logged in User
     const [loggedUser, setLoggedUser] =useState(null);


      //hook to update user in localstorage when any change occurs to it
  useEffect(() => {
    localStorage.setItem("USER", JSON.stringify(storedUser));
  }, [storedUser]);

     const login = (username, password) => {


       if(username === storedUser.username && password=== storedUser.password){
        setUsername("");
        setPass("");
        setLoggedUser(storedUser);
        setCurrentForm("");

       }
     };

     const signUp = (username, password) => {
        
       if( username!=="" && password!== ""){

        setStoredUser({
            username, password
        });
        setUsername("");
        setPass("");
        setCurrentForm("login");
       }

     };

     const updateUser =(username)=>{

      if(username!==""){

        setStoredUser({
          username: username, 
          password:storedUser.password
        });
        setLoggedUser({
          username: username, 
          password:storedUser.password
        });
        setUsername("");
        
      }


     }

     const checkLoggedStatus =() =>{

      if(loggedUser){
        setCurrentForm("profile")
      }
      else{
        setCurrentForm("login")
      }
     }

     const logout = () => {
       setLoggedUser(null);
     };

     return (
       <AuthDispatchContext.Provider value={{setCurrentForm, signUp, setUsername, setPass, logout, login, updateUser, checkLoggedStatus}}>
       <AuthStateContext.Provider value ={{loggedUser, username, pass, currentForm}}>
         {children}
         </AuthStateContext.Provider>
       </AuthDispatchContext.Provider>
     );
   }