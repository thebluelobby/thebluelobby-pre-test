import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

// import InputBase from "@mui/material/InputBase";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DeleteOutline from "@mui/icons-material/DeleteOutline";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { ChangeEvent, useState } from "react";

enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}
interface FormData {
  description: string;
  priority?: Priority;
}

const FilterableTaskTable = () => {
  const [tasks, setTasks] = useState([
    {
      uuid: "1",
      description: "hello",
      isCompleted: true,
    },
    {
      uuid: "2",
      description: "hello",
      isCompleted: true,
    },
    {
      uuid: "3",
      description: "my",
      isCompleted: false,
    },
    {
      uuid: "4",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      isCompleted: true,
    },
  ]);

  const [formData, setFormData] = useState<FormData>({
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = [
      ...tasks,
      { ...formData, isCompleted: false, uuid: `${Math.random() * 100000}` },
    ];
    setTasks(newTask);
    setFormData({
      description: "",
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const toggleTaskCompletion = (uuid: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.uuid === uuid) {
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      })
    );
  };

  const deleteTask = (uuid: string) => {
    setTasks(tasks.filter((task) => task.uuid !== uuid));
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="Task Lists">
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.uuid}>
                <TableCell>{task.description}</TableCell>
                <TableCell
                  align="right"
                  sx={{
                    width: "118px",
                  }}
                >
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="delete task"
                    onClick={() => deleteTask(task.uuid)}
                  >
                    <DeleteOutline />
                  </IconButton>
                  <Checkbox
                    inputProps={{ "aria-label": "Task Checkbox" }}
                    id={`checkbox-${task.uuid}`}
                    checked={task.isCompleted}
                    onChange={() => toggleTaskCompletion(task?.uuid)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            label="Age"
            onChange={handleChange}
            value={formData?.priority || ""}
            name="priority"
          >
            <MenuItem value={"LOW"}>Low</MenuItem>
            <MenuItem value={"MEDIUM"}>Medium</MenuItem>
            <MenuItem value={"HIGH"}>High</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{ ml: 1, flex: 1 }}
          placeholder="Add Task"
          inputProps={{ "aria-label": "Add Task" }}
          onChange={handleChange}
          name="description"
          value={formData.description}
          multiline
          maxRows={5}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="submit">
          <ArrowUpwardIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

export default FilterableTaskTable;
