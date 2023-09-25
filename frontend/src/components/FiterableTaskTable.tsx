import { ChangeEvent, useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DeleteOutline from "@mui/icons-material/DeleteOutline";

import { Priority, Task } from "../types/tasks";
import {
  completeTask,
  createTask,
  getTasks,
  uncompleteTask,
  deleteTask,
} from "../api/tasks";
import {
  FilterTypes,
  SortTypes,
  useListOption,
} from "../context/ListOptionContext";
import { ListOptionMenu } from "./ListOptionMenu";

interface FormData {
  description: string;
  priority?: Priority;
}

export interface IFilterSortSetup {
  filter: FilterTypes;
  sort: {
    by: SortTypes;
    isAscendingOrder: boolean;
  };
}

type TaskSimplified = Omit<Task, "deletedAt" | "createdAt" | "updatedAt">;

const FilterableTaskTable = () => {
  const [tasks, setTasks] = useState<TaskSimplified[]>([]);
  const { state } = useListOption();

  const [formData, setFormData] = useState<FormData>({
    description: "",
  });

  useEffect(() => {
    getTasks(
      state.filter === FilterTypes.ALL
        ? null
        : { isCompleted: state.filter === FilterTypes.COMPLETED },
      state.sort?.by?.length
        ? {
            by:
              state.sort?.by === SortTypes.CREATION_DATE
                ? "createdAt"
                : state.sort?.by === SortTypes.PRIORITY
                ? "priority"
                : "dueDate",
            order: state.sort.isAscendingOrder ? "ASC" : "DESC",
          }
        : null
    )
      .then((results) => setTasks(results))
      .catch((err) => console.log(err));
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(formData).then((newTask) => {
      const { description, isCompleted, id, priority } = newTask;
      setTasks([...tasks, { description, isCompleted, id, priority }]);
    });
    setFormData({
      description: "",
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleTaskCompletion = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    let completionToggler = completeTask;
    if (task.isCompleted) {
      completionToggler = uncompleteTask;
    }
    completionToggler(id).then(() => {
      setTasks(
        tasks.map((task) => {
          if (task.id === id) {
            return { ...task, isCompleted: !task.isCompleted };
          }
          return task;
        })
      );
    });
  };

  const removeTask = (id: string) => {
    deleteTask(id)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <ListOptionMenu />
      <TableContainer component={Paper}>
        <Table aria-label="Task Lists">
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
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
                    onClick={() => removeTask(task.id)}
                  >
                    <DeleteOutline />
                  </IconButton>
                  <Checkbox
                    inputProps={{ "aria-label": "Task Checkbox" }}
                    id={`checkbox-${task.id}`}
                    checked={task.isCompleted}
                    onChange={() => toggleTaskCompletion(task?.id)}
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
