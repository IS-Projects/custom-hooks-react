import useHttp from "../../hooks/use-Http";
import Section from "../UI/Section";
import TaskItem from "./TaskItem";
import classes from "./Tasks.module.css";

const Tasks = (props) => {
  const { isLoading, error, sendRequest } = useHttp();

  const removeTask = (taskId, taskData) => {
    props.onDelete(taskId);
  };

  const removeTaskHandler = async (taskId) => {
    sendRequest(
      {
        url: `https://test-project-eb0c5-default-rtdb.firebaseio.com/tasks/${taskId}.json`,
        method: "DELETE",
      },
      removeTask.bind(null, taskId)
    );
  };

  let taskList = <h2>No tasks found. Start adding some!</h2>;

  if (props.items.length > 0) {
    taskList = (
      <ul>
        {props.items.map((task) => (
          <TaskItem key={task.id} id={task.id} onClick={removeTaskHandler}>
            {task.text}
          </TaskItem>
        ))}
      </ul>
    );
  }

  let content = taskList;

  if (props.error) {
    content = <button onClick={props.onFetch}>Try again</button>;
  }

  if (props.loading) {
    content = "Loading tasks...";
  }

  return (
    <Section>
      {isLoading && <p>Removing item...</p>}
      {error && <p>Something went wrong. Please, try again.</p>}
      <div className={classes.container}>{content}</div>
    </Section>
  );
};

export default Tasks;
