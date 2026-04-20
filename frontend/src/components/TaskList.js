import React, { useState } from "react";
import axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

function TaskList({ tasks, setTasks }) {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleSave = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        title: editTitle,
        description: editDescription,
      });
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
      setEditId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 3, width: "100%" }}>
      <Table sx={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell><strong>Title</strong></TableCell>
            <TableCell><strong>Description</strong></TableCell>
            <TableCell align="center"><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task._id}>
              <TableCell>
                {editId === task._id ? (
                  <TextField
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    fullWidth
                  />
                ) : (
                  task.title
                )}
              </TableCell>
              <TableCell>
                {editId === task._id ? (
                  <TextField
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    fullWidth
                  />
                ) : (
                  task.description
                )}
              </TableCell>
              <TableCell align="center">
                {editId === task._id ? (
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<SaveIcon />}
                    onClick={() => handleSave(task._id)}
                  >
                    Save
                  </Button>
                ) : (
                  <>
                    <IconButton color="primary" onClick={() => handleEdit(task)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(task._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TaskList;
