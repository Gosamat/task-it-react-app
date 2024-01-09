import React, { useContext, useState } from "react";
import { TodosDispatchContext } from "../../Context/TodosContext";
import "./index.css";

export function NewTodoForm() {
  const [newItem, setNewItem] = useState("");
  const { addTodo } = useContext(TodosDispatchContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (newItem === "") return;

    addTodo(newItem);
    setNewItem("");
  }

  return (
    <section className="new-todo-section">
      <h3 className="add-todo-text">Add New Task</h3>
      <form className="new-todo-form" onSubmit={handleSubmit}>
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          type="text"
        />
        <button className="add-todo-btn">Add</button>
      </form>
    </section>
  );
}
