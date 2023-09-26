import { useEffect, useRef, useState } from "react";

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
import Box from "@mui/material/Box";
import useInfiniteScroll from "./InfiniteScroll";

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
  const [taskListProps, setTaskListProps] = useState<
    | {
        nextPage?: number;
        previousPage?: number;
        maxPage: number;
        pageSize: number;
      }
    | undefined
  >();
  const [hasMore, setHasMore] = useState<boolean>(false);

  const [loaderRef, converge, setConverge] = useInfiniteScroll();
  const { state, dispatch } = useListOption();

  const prevPageRef = useRef<number>(1);

  useEffect(() => {
    if (converge && hasMore) {
      dispatch({
        type: "increment-page",
      });
    }
    setConverge(false);
  }, [converge, hasMore, dispatch, setConverge]);

  useEffect(() => {
    console.log(state);
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
        : null,
      state?.page,
      state?.pageSize
    )
      .then((results) => {
        const { data, ...otherKeys } = results;
        setTaskListProps(otherKeys);
        if (state?.page - prevPageRef.current === 1) {
          setTasks((prev) => [...(prev || []), ...data]);
        } else {
          console.log("refresh", [...data]);
          setTasks([...data]);
        }
        prevPageRef.current = state.page;
      })
      .catch((err) => console.log(err));
  }, [state]);

  useEffect(() => {
    setHasMore(state.page < taskListProps?.maxPage);
  }, [state.page, taskListProps?.maxPage]);

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
    <Box>
      <ListOptionMenu />
      <Box
        sx={{
          maxWidth: "650px",
          margin: "0 auto",
          height: "80vh",
          overflow: "scroll",
          border: "2px solid #f5f5f5",
          borderRadius: "8px",
        }}
      >
        <Box>
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
                    onClick={() => toggleTaskCompletion(task?.id)}
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
        </Box>
        <Box ref={loaderRef}>{hasMore && <div>Loading...</div>}</Box>
      </Box>
      <CreateTaskForm
        successFunction={() => {
          setTasks([]);
          dispatch({
            type: "reset",
          });
        }}
      />
    </Box>
  );
};

export default FilterableTaskTable;
