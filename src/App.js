import React, { useEffect, useState } from 'react';
import useHttp from './hooks/use-https';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
  const [tasks, setTasks] = useState([]);
  const {isLoading, error, sendRequest: fetchTasks} = useHttp();

  useEffect(() =>{

   const transformTasks = (taskeObj) =>{
     const loadedTaskes = [];

     for(const taskKey in taskeObj){
       loadedTaskes.push({id: taskKey, text: taskeObj[taskKey].text})
     }

     setTasks(loadedTaskes);
   }

    fetchTasks({
      url:'http://localhost:8000/tasks'
    },
    transformTasks
    )
  },[fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
