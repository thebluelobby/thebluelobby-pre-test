import React from 'react';
import { iTask } from "../../utils/models/Task";
import Legend from "./Legend";
import TaskItem from "./TaskItem";
import { Link } from "react-router-dom";

interface iProps {
  items: iTask[];
  onDelete: (id:string) => void;
}

const TaskList: React.FC<iProps> = (props) => {

  const handleDelete = (id:string) =>{
    props.onDelete(id);
  }

  return (
    <React.Fragment>
      <Legend />
      <div className="border-teal-500 border-2 border-dashed m-3 p-3 overflow-y-auto" style={{ maxHeight: "calc(100vh - 250px)" }}>
        {
          props.items.length > 0 ?
            props.items.map((item: iTask) => {
              return (
                <TaskItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  dueDate={item.dueDate}
                  complete={item.complete}
                  createdOn={item.createdOn}
                  onDelete={handleDelete}
                />
              )
            })
            :
            <p className="text-center mt-16">
              No Tasks. Maybe <span className="underline text-teal-600 cursor-pointer"><Link to='/new-task'>add</Link></span> one?
            </p>
        }
      </div></React.Fragment>
  )
};

export default TaskList;