import useHttp from "../../hooks/use-Http";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const { isLoading, error, requestHandler } = useHttp(true);

  const enterTaskHandler = async (taskText) => {
    const createdTask = await requestHandler(taskText);

    props.onAddTask(createdTask);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
