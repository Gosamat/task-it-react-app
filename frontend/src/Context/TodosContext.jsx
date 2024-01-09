import React, { useState, useEffect } from "react";

export const TodosStateContext = React.createContext();

export const TodosDispatchContext = React.createContext();

export function TodosProvider({ children }) {
  //default value of todos will be based if data was found in localStorage
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEM");
    if (localValue === null) return [];

    return JSON.parse(localValue);
  });
  const [hideCompleted, setHideCompleted] = useState(false);
  const [sortBy, setSortBy] = useState("date");

  //hook to update todos in localstorage when any change occurs to them
  useEffect(() => {
    localStorage.setItem("ITEM", JSON.stringify(todos));
  }, [todos]);

  // function to add new todo
  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(),
          title,
          completed: false,
          edit: false,
          createdOn: new Date(),
        },
      ];
    });
  }

  //function to toggle the complete status of a todo
  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  // function to delete a todo
  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  // function to enable editing a todo
  function editTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, edit: true };
        }
        return todo;
      });
    });
  }
  // function to update edited todo
  function updateTodo(id, newTitle) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          if (newTitle) {
            return { ...todo, title: newTitle, edit: false };
          } else {
            return { ...todo, edit: false };
          }
        }
        return todo;
      });
    });
  }

  // variable to store new array of todos based on the value of the const hideCompleted
  const filteredTodos = hideCompleted
    ? todos.filter((todo) => !todo.completed)
    : todos;

  // function to sort todos based on the value of the const sortBy
  function sortTodos(a, b) {
    if (sortBy === "A-Z") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "Z-A") {
      return b.title.localeCompare(a.title);
    } else if (sortBy === "date") {
      return new Date(a.createdOn) - new Date(b.createdOn);
    }
  }

  // function to change sortBy value to the next one in sequence
  function toggleSortBy() {
    if (sortBy === "date") {
      setSortBy("A-Z");
    } else if (sortBy === "A-Z") {
      setSortBy("Z-A");
    } else {
      setSortBy("date");
    }
  }

  // function to set toggle the hideCompleted to the opposite boolean
  function toggleHideCompleted() {
    setHideCompleted(!hideCompleted);
  }

  return (
  
      <TodosDispatchContext.Provider
        value={{
          addTodo,
          toggleTodo,
          deleteTodo,
          editTodo,
          updateTodo,
          toggleSortBy,
          sortTodos,
          toggleHideCompleted,
        }}
      >
        <TodosStateContext.Provider
      value={{
        todos,
        sortBy,
        filteredTodos,
        hideCompleted,
      }}
    >
        {children}
        </TodosStateContext.Provider>
      </TodosDispatchContext.Provider>
   
  );
}
