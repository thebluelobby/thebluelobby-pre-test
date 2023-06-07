import React, { useState, useEffect } from 'react';
import { iTask } from '../utils/models/Task';
import Form from '../components/Form';
import Loading from "../components/UI/Loading";
import { useNavigate, useParams } from 'react-router-dom';

const EditTask: React.FC = () => {

  const [task, setTask] = useState<iTask>()
  const [isLoading, setIsLoading] = useState(false);
  const id = useParams<string>().id;
  const navigate = useNavigate();

  const handleSubmit = (value: iTask) => {
    setIsLoading(true);
    fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: value.title,
        description: value.description,
        dueDate: value.dueDate,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update task.');
        }
        setIsLoading(false);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/tasks/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch task.');
        }
        return res.json();
      })
      .then(task => {
        setTask(task);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);

  let initialFormValue: iTask = {
    title: '',
    description: '',
    dueDate: null,
    complete: false,
    createdOn: new Date()
  };

  if (task) {
    initialFormValue = {
      title: task.title,
      description: task.description,
      dueDate: new Date(task.dueDate!),
      complete: task.complete,
      createdOn: task.createdOn
    }
  }

  return (
    <div className="flex-1 md:relative">
      {isLoading && <Loading />}
      {/* Header */}
      <h1 className="text-2xl text-center mt-10 text-[#38AE99] font-bold">Edit Task</h1>

      {/* Add form */}
      {task && <Form
        initialValue={initialFormValue}
        onSubmit={handleSubmit}
        isEdit
      />}
    </div>
  )
};

export default EditTask;