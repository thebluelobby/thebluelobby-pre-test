import { HttpMethod, initFetch } from "../utils/fetch";
import { CreateTask, Task } from "../types/tasks";

const fetchCall = initFetch("http://localhost:3000");

export const getTasks = () => {
  return fetchCall<Task[]>(HttpMethod.GET, `/tasks`);
};

export const createTask = (body: CreateTask) => {
  return fetchCall<Task>(HttpMethod.POST, `/tasks`, {
    body,
  });
};
export const completeTask = (id: string) => {
  return fetchCall<Task>(HttpMethod.PATCH, `/tasks/${id}/complete`);
};

export const uncompleteTask = (id: string) => {
  return fetchCall<Task>(HttpMethod.PATCH, `/tasks/${id}/uncomplete`);
};

export const deleteTask = (id: string) => {
  return fetchCall<Task>(HttpMethod.DELETE, `/tasks/${id}`);
};
