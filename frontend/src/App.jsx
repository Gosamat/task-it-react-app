import React, { useContext } from "react";
import "./App.css";
import { TodosProvider } from "./Context/TodosContext";
import { AuthStateContext } from "./Context/AuthContext";

//Import Components
import { NewTodoForm } from "./Components/NewTodoForm";
import { TodoList } from "./Components/TodoList";
import { NavBar } from "./Components/NavBar";
import { LoginForm } from "./Components/LoginForm";
import { SignUpForm } from "./Components/SignUpForm";
import { ProfileForm } from "./Components/ProfileForm";

export default function App() {
  const { currentForm } = useContext(AuthStateContext);

  return (
    <>
      <NavBar />
      {currentForm === "login" ? (
        <LoginForm />
      ) : currentForm === "sign up" ? (
        <SignUpForm />
      ) : currentForm === "profile" ? (
        <ProfileForm />
      ) : (
        <TodosProvider>
          <NewTodoForm />
          <TodoList />
        </TodosProvider>
      )}
    </>
  );
}
