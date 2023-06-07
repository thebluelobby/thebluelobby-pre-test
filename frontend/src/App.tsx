import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import NewTask from "./pages/NewTask";
import Tasks from "./pages/Tasks";
import EditTask from "./pages/EditTask";

function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/new-task" element={<NewTask />} />
        <Route path="/task/:id" element={<EditTask />} />
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </Layout>
  )
};

export default App;
