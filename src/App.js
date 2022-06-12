import React, { useEffect, useState } from "react";

const getLocal = () => {
  const d = localStorage.getItem("item");
  const res = d ? JSON.parse(d) : [];
  return res;
};

const App = () => {
  const [todo, setTodo] = useState({});
  const [todos, setTodos] = useState(getLocal());
  const [editId, setEditId] = useState(0);
  const [flage, setFlage] = useState(false);
  const [val, setVal] = useState();
  const [vll, setVll] = useState({});

  console.log(todos);
  const changeInput = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (flage) {
      const items = [...todos];
      const item = items[editId];
      item.list = todo.list;
      items[editId] = item;
      setTodos(items);
      setEditId(0);
      setFlage(false);
      setTodo({});
    } else {
      setTodos([todo, ...todos]);
      setTodo({});
    }
  };
  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(todos));
  }, [todos]);
  const handleDelete = (id) => {
    const delTodo = todos.filter((val, ind) => ind !== id);
    setTodos(delTodo);
  };

  const handleEdit = (val, id) => {
    setTodo({ list: val.list });
    setEditId(id);
    setFlage(true);
  };

  const Complete = (id, val) => {
    const dd = document.getElementById(id);
    if (dd.style.textDecoration === "line-through") {
      dd.style.textDecoration = "none";
      const delTodo = todos.filter((val, ind) => ind !== id);
      setTodos(delTodo);
      setVal(true);
      setVll({ list: val });
    } else {
      dd.style.textDecoration = "line-through";
    }
  };

  if (val) {
    setTodos((val) => [...val, vll]);
    setVal(false);
  }
  const remove = () => {
    setTodos([]);
  };
  return (
    <div className="App">
      <div className="container">
        <h1>Todo List App</h1>

        <form className="todoForm" onSubmit={handleSubmit}>
          <input
            type="text"
            name="list"
            value={todo.list || ""}
            onChange={changeInput}
          />
          <button type="submit"> submit</button>

          <input name="requiredField"></input>

          <button style={{ float: "center" }} onClick={remove}>
            Reset
          </button>
        </form>

        <ul className="allTodos">
          {todos.map((t, id) => (
            <li className="singleTodo">
              <span className="todoText" id={id} key={id}>
                {t.list}
              </span>
              <button onClick={() => Complete(id, t.list)}>Complete</button>
              <button onClick={() => handleEdit(t, id)}>Edit</button>
              <button onClick={() => handleDelete(id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
