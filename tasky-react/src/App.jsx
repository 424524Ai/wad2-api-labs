import './App.css';
import Task from './components/Task';
import React, {useState, useEffect} from 'react';
import AddTaskForm from './components/Form';
import {getTasks, addTask, deleteTask, updateTask} from "./api/tasky-api";


// 项目的根组件
// 流程
// App   -->    main.jsx     -->     public/index.html(div id = "root") 
//     被引入到             渲染到
function App() {
  // task object = 对象
  const [taskState, setTaskState] = useState({tasks: []});

  useEffect(() => {
    getTasks().then(tasks => {
      setTaskState({tasks: tasks});
    });
  }, []);

  // form object = 对象 存储用户输入的任务信息
  const [ formState, setFormState ] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "Low"
  });

  const doneHandler = (taskIndex) => {
    // 1️⃣ 复制当前任务数组（浅拷贝) - 为了重新渲染
    const tasks = [...taskState.tasks];
    // 2️⃣ 切换指定任务的完成状态
    tasks[taskIndex].done = !tasks[taskIndex].done;
    // 3️⃣ 更新状态
    updateTask(tasks[taskIndex]);
    setTaskState({tasks});
  }

  const deleteHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];
    const id = tasks[taskIndex]._id;
    tasks.splice(taskIndex, 1);
    deleteTask(id);
    setTaskState({tasks});
  }

  // 用来处理用户填写的任务信息的更新
  const formChangeHandler = (event) => {
    let form = {...formState};

    switch(event.target.name) {
      case "title":
          form.title = event.target.value;
          break;
      case "description":
          form.description = event.target.value;
          break;
      case "deadline":
          form.deadline = event.target.value;
          break;
       case "priority":
          form.priority = event.target.value;
          break;   
      default:
          form = formState;
    }
    setFormState(form);
  }

  console.log(formState);

    const formSubmitHandler = async (event) => {
    event.preventDefault();

    // 浅拷贝tasks 和 form
    const tasks = taskState.tasks?[...taskState.tasks]:[];
    const form = {...formState};
    const newTask = await addTask(form);
    tasks.push(newTask);
    setTaskState({tasks});
  }

  // 渲染给用户看的信息
  return (
    <div className="container">
      <h1>Tasky</h1>
      {taskState.tasks.map((task, index) => (              
      <Task title = {task.title} 
      description = {task.description} 
      deadline = {task.deadline} 
      priority = {task.priority} 
      key = {task._id} 
      done={task.done}
      markDone={() => doneHandler(index)}
      deleteTask = {() => deleteHandler(index)}
      /> 
      ))} 
      <AddTaskForm submit={formSubmitHandler} change={formChangeHandler} formState={formState}/>
    </div>
  );
}

export default App;