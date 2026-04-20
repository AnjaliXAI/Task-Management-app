import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Container } from "@mui/material";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tasks");
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <Container maxWidth="md" className="App">
      <Navbar />
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </Container>
  );
}

export default App;
