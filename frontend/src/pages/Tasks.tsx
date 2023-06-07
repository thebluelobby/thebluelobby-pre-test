import TaskList from "../components/taskcomponents/TaskList";
import React, { useState, useEffect, useMemo } from 'react';
import { iTask } from "../utils/models/Task";
import Select, { Option } from "../components/Select";
import Loading from "../components/UI/Loading";

const Tasks: React.FC = () => {

  const [tasks, setTasks] = useState<iTask[]>([]);
  const [sortValue, setSortValue] = useState<string | undefined>('creationDate');
  const [filterValue, setFilterValue] = useState<string | undefined>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const filterOptions: Option[] = [{ text: 'All', value: "all" }, { text: 'Completed', value: "completed" }, { text: 'Not Completed', value: "notComplete" }]
  const sortOptions: Option[] = [{ text: 'Creation Date', value: "creationDate" }, { text: 'Due Date', value: "dueDate" }]

  useEffect(() => {
    setIsLoading(true);
    if (filterValue === 'all') {
      fetch('http://localhost:3000/api/tasks')
        .then(response => response.json())
        .then(data => setTasks(data))
        .catch(error => console.log(error));
    } else {
      fetch(`http://localhost:3000/api/tasks?filter=${filterValue === 'completed'}`)
        .then(response => response.json())
        .then(data => setTasks(data))
        .catch(error => console.log(error));
    }
    setIsLoading(false)
  }, [filterValue]);

  const sortedTasks = useMemo(() => {
    const sorted = [...tasks];

    sorted.sort((a, b) => {
      if (sortValue === 'creationDate') {
        return new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime();
      }
      if (sortValue === 'dueDate') {
        return new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime();
      }
      return 0;
    });

    return sorted;
  }, [sortValue, tasks]);


  const handleChange = (name: string, value: string | undefined) => {
    if (name === 'sort') {
      setSortValue(value);
    }
    if (name === 'filter') {
      setFilterValue(value);
    }
  }


  const handleDelete = (id: string) => {
    setIsLoading(true);
    fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.status === 200) {
          setTasks((prev) => prev.filter((task) => task.id !== id));
        } else {
          throw new Error('Task deletion failed.');
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };


  return (
    <div className="flex-1 md:relative">
      {isLoading && <Loading />}
      <h1 className="text-2xl text-center mt-10 text-[#38AE99] font-bold mb-5">Tasks</h1>
      <div className="max-w-3xl mx-auto">
        <Select
          name="filter"
          label="Filter"
          options={filterOptions}
          onChange={handleChange}
        />
        <Select
          name="sort"
          label="Sort"
          options={sortOptions}
          onChange={handleChange}
        />
        <TaskList
          items={sortedTasks}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
};

export default Tasks;