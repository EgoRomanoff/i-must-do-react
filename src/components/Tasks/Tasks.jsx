import stl from './Tasks.module.scss'
import Header from "../Header/Header"
import TaskList from "../TaskList/TaskList"
import Footer from "../Footer/Footer"
import {useState} from "react";

function Tasks() {

	const [tasks, setTasks] = useState([
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
				id: 5,
				name: 'Название задачи название задачи название задачи название задачи',
				description: 'Описание задачи описание задачи описание задачи описание задачи',
				date: '01.05.2022',
				time: '23:45',
				status: 'inProcess'
			},
			{
				id: 6,
				name: 'Название задачи название задачи название задачи название задачи',
				description: 'Описание задачи',
				date: null,
				time: '23:45',
				status: 'complete'
			},
			{
				id: 7,
				name: 'Название задачи',
				description: 'Описание задачи описание задачи описание задачи описание задачи',
				date: '01.05.2022',
				time: null,
				status: 'complete'
			},
			{
				id: 8,
				name: 'Название задачи название задачи',
				description: null,
				date: null,
				time: null,
				status: 'inProcess'
			},
			{
				id: 9,
				name: 'Название задачи название задачи название задачи название задачи',
				description: 'Описание задачи описание задачи описание задачи описание задачи',
				date: '01.05.2022',
				time: '23:45',
				status: 'waiting'
			}
		]
	)

	// creating an element for changing drag effect picture
	const dragImg = document.createElement('canvas');
	dragImg.classList.add('drag-img')
	dragImg.width = 0;
	dragImg.height = 0;

  let startPosition, tasksWidth

	const initResize = e => {
		e.stopPropagation()
    const tasksElem = document.querySelector('#tasks')
    startPosition = e.clientX
    tasksWidth = tasksElem.offsetWidth
	  e.dataTransfer.setDragImage(dragImg, 0, 0)
		e.target.style.cursor = 'col-resize'
	}

  const startResize = e => {
    const tasksElem = document.querySelector('#tasks')
    tasksElem.style.width = `${tasksWidth + e.clientX - startPosition}px`
  }

	return (
		<div className={ stl.wrapper } id='tasks'>
      <div
        className={ stl.resizer }
        draggable={ true }
        onDragStart={ initResize }
        onDrag={ startResize }
      />
			<Header/>
			<TaskList
				tasks={ tasks }
				setTasks={ setTasks }
			/>
			<Footer
				total={ tasks.length }
				waiting={ tasks.filter(task => task.status === 'waiting').length }
				inProcess={ tasks.filter(task => task.status === 'inProcess').length }
				complete={ tasks.filter(task => task.status === 'complete').length }
			/>
		</div>
	)
}

export default Tasks