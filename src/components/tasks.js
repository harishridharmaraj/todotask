import React, { useState, useEffect } from "react";
import "./styles.css";

const Tasks = () => {
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [apidata, setApiData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editid, setEditId] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const Newdata = async () => {
    let res = await fetch("https://65536c325449cfda0f2eaa2c.mockapi.io/tasks", {
      method: "GET",
    });
    let data = await res.json();
    console.log(data);
    setApiData(data);
    setFilteredData(data);
  };

  useEffect(() => {
    Newdata();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editMode) {
      await handleUpdate(editid);
    } else if (!task.trim()) {
      alert("Task name is required");
    } else if (!desc.trim()) {
      alert("Description is required");
    } else {
      let newTask = {
        name: task,
        description: desc,
        status: false,
      };

      let dataa = await fetch(
        "https://65536c325449cfda0f2eaa2c.mockapi.io/tasks",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },

          body: JSON.stringify(newTask),
        }
      );
      let res = await dataa.json();
      console.log(res);
    }

    Newdata();
    setTask("");
    setDesc("");
    setEditMode(false);
    setEditId(null);
  };

  const handleDelete = async (id) => {
    let ress = await fetch(
      `https://65536c325449cfda0f2eaa2c.mockapi.io/tasks/${id}`,
      { method: "DELETE" }
    );
    let dataa = await ress.json();
    console.log(dataa);
    Newdata();
    setTask("");
    setDesc("");
    setEditMode(false);
    setEditId(null);
  };

  const handleUpdate = async (id) => {
    let updateTask = {
      name: task,
      description: desc,
    };
    let res = await fetch(
      `https://65536c325449cfda0f2eaa2c.mockapi.io/tasks/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        //pass data in body
        body: JSON.stringify(updateTask),
      }
    );
    let data = await res.json();
    console.log(data);
  };
  const statusStyles = {
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    marginLeft: "10px",
  };

  const handleEdit = async (id) => {
    let res = await fetch(
      `https://65536c325449cfda0f2eaa2c.mockapi.io/tasks/${id}`,
      { method: "GET" }
    );
    let data = await res.json();
    setTask(data.name);
    setDesc(data.description);
    setEditId(id);
    setEditMode(true);
  };

  const handleStatus = async (id, value) => {
    let updateStatus;
    if (value === false) {
      updateStatus = {
        status: true,
      };
    } else if (value === true) {
      updateStatus = {
        status: false,
      };
    }
    let res = await fetch(
      `https://65536c325449cfda0f2eaa2c.mockapi.io/tasks/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(updateStatus),
      }
    );
    let data = await res.json();
    console.log(data);
    Newdata();
    window.location.reload(false);
  };
  const handleFilter = (e) => {
    e.preventDefault();
    if (e.target.value === "completed") {
      setFilteredData(apidata.filter((item) => item.status === true));
    } else if (e.target.value === "not completed") {
      setFilteredData(apidata.filter((item) => item.status === false));
    } else if (e.target.value === "All") {
      setFilteredData(apidata);
    }
  };

  return (
    <div className="todos">
      <div>
        <h1>My Todo</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button type="submit" id="addbtn">
            {editMode ? "Update Todo" : "Add Todo"}
          </button>
        </form>
      </div>
      <div className="status">
        <h2>My Todos</h2>
        <div>
          Status Filter:{" "}
          <select onChange={(e) => handleFilter(e)}>
            <option value="All">All</option>
            <option value="completed">Completed</option>
            <option value="not completed">Not Completed</option>
          </select>
        </div>
      </div>
      <div className="cards">
        {filteredData.map((items) => (
          <div key={items.id} className="single">
            <p>Name: {items.name}</p>
            <p>Description: {items.description}</p>
            <p>
              Status:
              <select
                onChange={() => handleStatus(items.id, items.status)}
                style={{
                  ...statusStyles,
                  backgroundColor:
                    items.status === true ? "#13AD8A" : "#FE8080",
                }}
              >
                <option>
                  {items.status === true ? "Completed" : "Not Completed"}
                </option>
                <option>
                  {items.status === false ? "Completed" : "Not Completed"}
                </option>
              </select>
            </p>
            <div className="actionbtn">
              <button onClick={() => handleEdit(items.id)}>Edit</button>
              <button onClick={() => handleDelete(items.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
