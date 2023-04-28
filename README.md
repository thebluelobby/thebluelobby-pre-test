# TheBlueLobby Pre-interview assessment

## Simple Task Manager App

The candidate should create a simple task manager app using ReactJS frontend, NestJS backend and PostgreSQL database. The app should have the following features:

---
### Main Goal
We're looking for developers who are passionate about their work and can quickly acquire new skills, regardless of their technical background. We believe in equal opportunities for everyone who meets these qualifications, and we would love for you to join our team.

---
### Rules
1. Fork this repository
2. Commit your changes to your repository
3. Create pull request
4. Email us to notify you have completed the test.
---

### Features:

1. **Add Task:** Allow users to add a new task by typing in a task description and hitting enter or clicking a button.
2. **List Tasks:** Display the list of tasks in a scrollable container. Each task item should show the task description and a checkbox to mark the task as completed.
3. **Mark Task as Completed:** When a user checks the checkbox, the task should be marked as completed. A visual indication (e.g., strike-through or change in background color) should differentiate completed tasks from pending ones.
4. **Delete Task:** Include a delete button/icon next to each task, allowing users to delete tasks from the list.
5. **Filter Tasks:** Implement a simple filter that allows users to toggle between showing all tasks, completed tasks, and pending tasks.

### Backend Features:

1. **Create Task:** Create an API endpoint to add a new task with a description. Assign a unique ID and store the task in the PostgreSQL database.
2. **List Tasks:** Create an API endpoint to retrieve all tasks from the database.
3. **Update Task:** Create an API endpoint to update the status of a task (completed or pending).
4. **Delete Task:** Create an API endpoint to delete a task from the database.
5. **Filter Tasks:** Modify the list tasks endpoint to accept query parameters for filtering completed and pending tasks.

### Guidelines and Requirements:

- Divide the app into reusable components with proper separation of concerns.
- Demonstrate the use of ReactJS concepts such as components, state management, and event handling.
- Use NestJS to create the backend and set up a PostgreSQL database for storing tasks.
- Use TypeORM for database interactions

### Bonus:

1. Implement local storage to persist tasks even after the browser is closed and reopened.
2. Add a feature to edit existing tasks.
3. Implement unit tests for components using a testing library like Jest and React Testing Library.
4. Add responsiveness to the app for different screen sizes.
5. Implement data validation and error handling
6. Add pagination to the list tasks endpoint, and implement infinite scrolling or a "Load more" button in the frontend.
7. Implement sorting options for tasks, such as by creation date, due date, or priority.

## PostgreSQL Installation
### Docker
```shell
docker run --name postgres -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres
```
