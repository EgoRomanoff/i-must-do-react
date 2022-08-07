import stl from './Tasks.module.scss'
import Header from "../Header/Header";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";

function Tasks() {
   let tasks = [
     {
       id: 1,
       name: 'Название задачи название задачи название задачи название задачи',
       description: 'Описание задачи описание задачи описание задачи описание задачи',
       date: '01.05.2022',
       time: '23:45',
       status: 'inProcess'
     },
     {
       id: 2,
       name: 'Название задачи название задачи название задачи название задачи',
       description: 'Описание задачи',
       date: null,
       time: '23:45',
       status: 'waiting'
     },
     {
       id: 3,
       name: 'Название задачи',
       description: 'Описание задачи описание задачи описание задачи описание задачи',
       date: '01.05.2022',
       time: null,
       status: 'complete'
     },
     {
       id: 4,
       name: 'Название задачи название задачи',
       description: null,
       date: null,
       time: null,
       status: 'inProcess'
     },
     {
       id: 1,
       name: 'Название задачи название задачи название задачи название задачи',
       description: 'Описание задачи описание задачи описание задачи описание задачи',
       date: '01.05.2022',
       time: '23:45',
       status: 'inProcess'
     },
     {
       id: 2,
       name: 'Название задачи название задачи название задачи название задачи',
       description: 'Описание задачи',
       date: null,
       time: '23:45',
       status: 'complete'
     },
     {
       id: 3,
       name: 'Название задачи',
       description: 'Описание задачи описание задачи описание задачи описание задачи',
       date: '01.05.2022',
       time: null,
       status: 'complete'
     },
     {
       id: 4,
       name: 'Название задачи название задачи',
       description: null,
       date: null,
       time: null,
       status: 'inProcess'
     },{
       id: 1,
       name: 'Название задачи название задачи название задачи название задачи',
       description: 'Описание задачи описание задачи описание задачи описание задачи',
       date: '01.05.2022',
       time: '23:45',
       status: 'waiting'
     }
   ]

    return (
        <div className={ stl.wrapper }>
            <Header/>
            <TaskList tasks={tasks}/>
            <Footer
              total={tasks.length}
              waiting={tasks.filter(task => task.status === 'waiting').length}
              inProcess={tasks.filter(task => task.status === 'inProcess').length}
              complete={tasks.filter(task => task.status === 'complete').length}
            />
        </div>
    );
}

export default Tasks;