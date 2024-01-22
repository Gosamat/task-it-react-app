import React, { useContext } from "react";
import "./App.css";
import { TodosProvider } from "./Context/TodosContext";
import { Route, Routes } from 'react-router-dom'

//Import Components
import { NavBar } from "./Components/NavBar";
import { LoginForm } from "./Components/LoginForm";
import { TaskListsPage	 } from "./pages/TaskListsPage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";

export default function App() {

  return (
    <>
      <NavBar />
      <LoginForm />
      <TodosProvider>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks" element={<TaskListsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      </TodosProvider>
    </>
  );
}
