import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { TodoList } from "../../Components/TodoList";

export function TaskListsPage() {
    const { isLoggedIn, user, logOutUser, API_URL } = useContext(AuthContext);
    const [taskLists, setTaskLists] = useState(null)



    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
            console.log(storedToken)
          axios
            .get(`${API_URL}/tasks/lists`, {
              headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                console.log("test")
                setTaskLists(response.data)
            })
            .catch((error) =>
              console.log(
                "error while grabbing plants current user from API: ",
                error
              )
            );
        }
      }, [API_URL, setTaskLists]);

  return (
    <div className="todo-lists-page">
        <TodoList/>
    </div>
  );
}
