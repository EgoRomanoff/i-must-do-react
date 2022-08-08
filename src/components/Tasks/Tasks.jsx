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
		}, {
			id: 9,
			name: 'Название задачи название задачи название задачи название задачи',
			description: 'Описание задачи описание задачи описание задачи описание задачи',
			date: '01.05.2022',
			time: '23:45',
			status: 'waiting'
		}
	]

	const dragImg = document.createElement('img');
	dragImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
	dragImg.style.width = '30px'
	dragImg.style.height = '30px'
	dragImg.style.background = 'red'

  let startPosition, elemWidth

	const initResize = e => {
		e.stopPropagation()
    const elem = document.querySelector('#tasks')
    startPosition = e.clientX
    elemWidth = elem.offsetWidth
		console.log(startPosition)

		document.body.appendChild(dragImg)
	}

  const startResize = e => {
    const tasksElem = document.querySelector('#tasks')
	  e.dataTransfer.setDragImage(dragImg, 0, 0);

    tasksElem.style.width = `${elemWidth + e.clientX - startPosition}px`
  }

	const endResize = () => {
		document.body.removeChild(dragImg)
	}

	return (
		<div className={ stl.wrapper } id='tasks'>
      <div
        className={ stl.resizer }
        draggable={ true }
        onDragStart={ initResize }
        onDrag={ startResize }
        onDragEnd={ endResize }
      />
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