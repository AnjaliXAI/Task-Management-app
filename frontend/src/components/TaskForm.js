import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Paper, Stack } from "@mui/material";

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/tasks", {
        title,
        description,
      });
      onTaskAdded(res.data);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Paper elevation={4} sx={{ p: 3, mt: 3 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Task Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Task Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="secondary">
            Add Task
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default TaskForm;
