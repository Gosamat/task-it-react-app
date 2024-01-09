import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { TodosDispatchContext } from "../../Context/TodosContext";
import "./index.css";

export function EditTodoForm({ completed, id, title }) {
  const [newTitle, setNewTitle] = useState("");
  const { toggleTodo, updateTodo } = useContext(TodosDispatchContext);

  return (
    <li className="edit-todo-listing">
      <form>
        <div className="edit-todo-container-left">
          <input
            className="checkbox-input"
            type="checkbox"
            checked={completed}
            onChange={(e) => toggleTodo(id, e.target.checked)}
          />
          <input
            className="text-input"
            type="text"
            value={newTitle || title}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div className="edit-todo-container-right">
          <button
            className="btn btn-save"
            onClick={() => updateTodo(id, newTitle)}
          >
            SAVE
          </button>
        </div>
      </form>
    </li>
  );
}

// Props validation
EditTodoForm.propTypes = {
  completed: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
