import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, addTask, updateTask, deleteTask, sortByPriority, sortByDueDate } from "@slices/taskSlice";
import InputField from "../components/InputField";
import Button from "../components/Button";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error, sortBy } = useSelector((state) => state.tasks);
  const user = useSelector((state) => state.auth.user);
  const [taskTitle, setTaskTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = () => {
    if (taskTitle.trim() !== "" && dueDate !== "") {
      dispatch(addTask({ title: taskTitle, completed: false, priority, due_date: dueDate }));
      setTaskTitle("");
      setDueDate("");
    }
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user?.name || "User"}!</h2>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}>
          {totalTasks > 0 ? `${progress}% Completed` : "No Tasks"}
        </div>
      </div>

      <div className="task-input">
        <InputField type="text" placeholder="Task Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
        <InputField type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <Button text="Add Task" onClick={handleAddTask} className="add-task-btn" />
      </div>

      <div className="sort-buttons">
        <Button text="Sort by Priority" onClick={() => dispatch(sortByPriority())} className={sortBy === "priority" ? "active" : ""} />
        <Button text="Sort by Due Date" onClick={() => dispatch(sortByDueDate())} className={sortBy === "due_date" ? "active" : ""} />
      </div>

      {loading ? <p>Loading tasks...</p> : error ? <p className="error">{error}</p> : null}

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <div>
              <strong>{task.title}</strong> <br />
              <small>Priority: {task.priority} | Due: {task.due_date}</small>
            </div>
            <Button text="✔" onClick={() => dispatch(updateTask(task))} />
            <Button text="❌" onClick={() => dispatch(deleteTask(task.id))} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;