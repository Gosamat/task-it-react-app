import React, { useContext } from "react";
import { TodoItem } from "../TodoItem";
import { EditTodoForm } from "../EditTodoForm";
import {
  TodosDispatchContext,
  TodosStateContext,
} from "../../Context/TodosContext";
import "./index.css"

export function TodoList() {
  
  const { toggleSortBy, sortTodos, hideCompleted, toggleHideCompleted } =
    useContext(TodosDispatchContext);
  const { sortBy, filteredTodos } = useContext(TodosStateContext);

  return (
    <section className="todo-list-section">
      <div className="sort-todos-div" onClick={() => toggleSortBy()}>
        <h3>Tasks</h3>
        <h6>{"\u25B2\u25BC"} {sortBy}</h6>
      </div>
      <ul className="todo-list-listings">
        {filteredTodos.length === 0 && "No Todos"}
        {filteredTodos.sort(sortTodos).map((todo) => {
          if (todo.edit) return <EditTodoForm {...todo} key={todo.id} />;
          return <TodoItem {...todo} key={todo.id} />;
        })}
      </ul>
      <div className="hide-completed-check" >
      <p>
        Hide Completed
        </p>
        <input
          type="checkbox"
          checked={hideCompleted}
          onChange={toggleHideCompleted}
        />
    
      </div>
    </section>
  );
}
