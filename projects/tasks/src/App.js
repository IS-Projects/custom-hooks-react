import React, { useEffect, useState } from "react";
import useHttp from "./hooks/use-Http";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformTasks = (tasksObj) => {
      const loadedTasks = [];

      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }

      setTasks(loadedTasks);
    };

    fetchTasks(
      {
        url: "https://test-project-eb0c5-default-rtdb.firebaseio.com/tasks.json",
      },
      transformTasks
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  const taskRemoveHandler = (taskId) => {
    setTasks((prevTasks) => {
      const taskToRemoveIndex = prevTasks.findIndex(
        (task) => task.id === taskId
      );
      prevTasks.splice(taskToRemoveIndex, 1);
      return prevTasks;
    });
  };
  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
        onDelete={taskRemoveHandler}
      />
    </React.Fragment>
  );
}

export default App;
