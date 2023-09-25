import { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";

import DeleteOutline from "@mui/icons-material/DeleteOutline";

import { Priority, Task } from "../types/tasks";
import {
  completeTask,
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
import { CreateTaskForm } from "./CreateTaskForm";

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
  const [refresh, setRefresh] = useState<boolean>(false);

  const { state } = useListOption();

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
  }, [state, refresh]);

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

  /*
  to do
  // - separation of concern
  - lazy loading
  - Implement local storage to persist tasks even after the browser is closed and reopened.
- Add a feature to edit existing tasks.
- Implement unit tests for components using a testing library like Jest and React Testing Library.
- Add responsiveness to the app for different screen sizes.
- Implement data validation and error handling
- Add pagination to the list tasks endpoint, and implement infinite scrolling or a "Load more" button in the frontend.
- Implement sorting options for tasks, such as by creation date, due date, or priority.
   */
  return (
    <div>
      <ListOptionMenu />
      <TableContainer component={Paper}>
        <Table aria-label="Task Lists">
          <TableBody>
            {tasks.map((task) => (
              <TableRow
                key={task.id}
                sx={{
                  ...(task.isCompleted
                    ? {
                        backgroundColor: "#f5f5f5",
                      }
                    : {}),
                }}
              >
                <TableCell
                  sx={{
                    ...(task.isCompleted
                      ? {
                          textDecoration: "line-through",
                          color: "gray",
                        }
                      : {}),
                  }}
                >
                  {task.description}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    width: "168px",
                  }}
                >
                  {task.priority === Priority.HIGH ? (
                    <Chip
                      label="High"
                      size="small"
                      color="error"
                      variant="outlined"
                    />
                  ) : task.priority === Priority.LOW ? (
                    <Chip label="Low" size="small" variant="outlined" />
                  ) : (
                    ""
                  )}
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
      <CreateTaskForm successFunction={() => setRefresh(!refresh)} />
    </div>
  );
};

export default FilterableTaskTable;
