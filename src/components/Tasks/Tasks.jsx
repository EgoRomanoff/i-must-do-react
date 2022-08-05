import stl from './Tasks.module.scss'
import Header from "../Header/Header";
import TaskList from "../TaskList/TaskList";

function Tasks() {

  let tasks = [
    {
      id: 1,
      name: 'Название задачи название задачи название задачи название задачи',
      description: 'Описание задачи описание задачи описание задачи описание задачи',
      date: '01.05.2022',
      time: '23:45',
      status: 'process'
    }
  ]

    return (
        <div className={ stl.wrapper }>
            <Header/>
            <TaskList/>
            <footer/>
        </div>
    );
}

export default Tasks;