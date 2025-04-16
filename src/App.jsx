import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // const [todos, setTodos] = useState([]);
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [inputValue, setInputValue] = useState("");
  // console.log(input);
  // console.log(todos);

  // add todos
  const addTodo = () => {
    if (inputValue.trim() === "") return;
    setTodos([
      ...todos,
      { id: Date.now(), text: inputValue, completed: false },
    ]);
    setInputValue("");
  };

  // delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // toggleTodo
  const toggleTodo = (ali) => {
    setTodos(
      todos.map((todo) =>
        todo.id === ali ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Enter Button
  const handleKeyPress = (e) => {
    if (e.key === "Enter") addTodo();
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow-sm"
        style={{ maxWidth: "500px", margin: "auto" }}
      >
        <div className="card-body">
          <h2 className="card-title text-center mb-4"> Task Manager</h2>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Add a new task"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="btn btn-primary" onClick={addTodo}>
              Add Task
            </button>
          </div>
          <ul className="list-group">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="list-group-item d-flex align-items-center justify-content-between"
              >
                <span
                  className="flex-grow-1"
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.text}
                </span>
                <button
                  className={`btn btn-sm me-2 ${
                    todo.completed ? "btn-secondary" : "btn-success"
                  }`}
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.completed ? "uncomplete" : "complete"}
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteTodo(todo.id)}
                >
                  delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
