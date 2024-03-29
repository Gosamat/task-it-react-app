import React, { useContext, useEffect, useState } from "react";
import { TodoItem } from "../TodoItem";
import { EditTodoForm } from "../EditTodoForm";
import axios from "axios";
import {
  TodosDispatchContext,
  TodosStateContext,
} from "../../Context/TodosContext";
import "./index.css";

export function TodoList() {
  const {
    toggleSortBy,
    sortTodos,
    hideCompleted,
    toggleHideCompleted,
  } = useContext(TodosDispatchContext);
  const { sortBy, filteredTodos } = useContext(TodosStateContext);
  const [tasks, setTasks] = useState([]);


  const createTask = async (description) => {
    try {
      await axios.post('http://your-backend-api/tasks', { description });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://your-backend-api/tasks/${taskId}`);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <section className="todo-list-section">
      <div className="sort-todos-div" onClick={() => toggleSortBy()}>
        <h3>Tasks</h3>
        <h6>{"\u25B2\u25BC"} {sortBy}</h6>
      </div>
      <ul className="todo-list-listings">
        {filteredTodos.length === 0 && "No Todos"}
        {tasks.sort(sortTodos).map((task) => {
          if (task.edit) return <EditTodoForm {...task} key={task.id} />;
          return <TodoItem {...task} key={task.id} onDelete={deleteTask} />;
        })}
      </ul>
      <div className="hide-completed-check">
        <p>Hide Completed</p>
        <input
          type="checkbox"
          checked={hideCompleted}
          onChange={toggleHideCompleted}
        />
      </div>
    </section>
  );
}
