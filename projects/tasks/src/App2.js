import useHttp from "./hooks/use-Http2";
import { useEffect, useState, Fragment } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask2";

function App() {
  const { isLoading, error, requestHandler } = useHttp();
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const loadedTasks = await requestHandler();

    setTasks(loadedTasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </Fragment>
  );
}

export default App;
