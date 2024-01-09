import React, { useContext } from "react";
import PropTypes from "prop-types";
import { TodosDispatchContext } from "../../Context/TodosContext";
import "./index.css"

export function TodoItem({ completed, id, title }) {

  const { toggleTodo, editTodo, deleteTodo } = useContext(TodosDispatchContext);

  return (
    <li className="todo-listing">
      <div className="todo-item-container-left">
        <label style={{color: completed ? "#666666" : "#000000"}}>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => toggleTodo(id, e.target.checked)}
          />
          {title}
        </label>
      </div>
      <div className="todo-item-container-right">
        <button className="btn btn-edit" onClick={() => editTodo(id)}>
          EDIT
        </button>
        <button className="btn btn-delete" onClick={() => deleteTodo(id)}>
          DELETE
        </button>
      </div>
    </li>
  );
}

// Props validation
TodoItem.propTypes = {
  completed: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired, 
  title: PropTypes.string.isRequired,
};