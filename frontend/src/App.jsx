import React, { useContext } from "react";
import "./App.css";
import { TodosProvider } from "./Context/TodosContext";

//Import Components
import { NewTodoForm } from "./Components/NewTodoForm";
import { TodoList } from "./Components/TodoList";
import { NavBar } from "./Components/NavBar";
import { LoginForm } from "./Components/LoginForm";
import { SignUpForm } from "./Components/SignUpForm";
import { ProfileForm } from "./Components/ProfileForm";

export default function App() {

  return (
    <>
      <NavBar />
        <LoginForm />
        <TodosProvider>
          <NewTodoForm />
          <TodoList />
        </TodosProvider>
    </>
  );
}
