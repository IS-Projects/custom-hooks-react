import classes from "./TaskItem.module.css";

const TaskItem = (props) => {
  const removeHandler = () => {
    props.onClick(props.id);
  };
  return (
    <li className={classes.task} id={props.id}>
      <p>{props.children}</p>
      <button onClick={removeHandler}>Delete</button>
    </li>
  );
};

export default TaskItem;
