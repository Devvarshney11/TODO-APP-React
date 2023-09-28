import "./App.css";
import { useState, useEffect } from "react";

const API_BASE = "http://localhost:3001";

function App() {
  const [todos, setTodo] = useState([]);
  const [popUpActive, setPopUpActive] = useState([]);
  const [newtodo, setnewtodo] = useState("");

  useEffect(() => {
    GetTodos();
  }, []);
  const GetTodos = () => {
    fetch(API_BASE + "/todos")
      .then((res) => res.json())
      .then((data) => setTodo(data))
      .catch((err) => console.error("error", err));
  };
  const completeTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/complete/" + id).then((res) =>
      res.json()
    );
    setTodo((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }
        return todo;
      })
    );
  };
  const deleteTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());
    setTodo((todos) => todos.filter((todo) => todo._id !== data._id));
  };
  const addTodo = async () => {
    const data = await fetch(API_BASE + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newtodo,
      }),
    }).then((res) => res.json());
    setTodo([...todos, data]);
    setPopUpActive(false);
    setnewtodo("");
  };
  return (
    <div className="App">
      <h1>Welcome, Buddy</h1>
      <h4>Your Tasks</h4>
      <div className="todos">
        {todos.map((todo) => (
          <div
            className={"todo " + (todo.complete ? "is-complete" : "")}
            key={todo._id}
            onClick={() => completeTodo(todo._id)}
          >
            <div className="checkbox"></div>
            <div className="text">{todo.text}</div>
            <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
              x
            </div>
          </div>
        ))}
        <div className="addPopUp" onClick={() => setPopUpActive(true)}>
          +
        </div>
        {popUpActive ? (
          <div className="popup">
            <div className="closeUp" onClick={() => setPopUpActive(false)}>
              x
            </div>
            <div className="content">
              <h3>Add Task</h3>
              <input
                type="text"
                className="add-todo-input"
                onChange={(e) => setnewtodo(e.target.value)}
                value={newtodo}
              />
              <div className="button" onClick={addTodo}>
                Create Task
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
