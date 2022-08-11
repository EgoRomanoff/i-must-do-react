import stl from './Tasks.module.scss'
import Header from "../Header/Header"
import TaskList from "../TaskList/TaskList"
import Footer from "../Footer/Footer"
import TaskListSkeleton from "../Skeletons/TaskListSkeleton/TaskListSkeleton"
import FooterSkeleton from "../Skeletons/FooterSkeleton/FooterSkeleton"
import {useRef} from "react";

function Tasks({ tasks, setTasks, isLoading }) {

	const tasksElem = useRef(null) // ref on this element (use in function fo resizing)

	// creating an element for changing drag effect picture
	const dragImg = document.createElement('canvas');
	dragImg.classList.add('drag-img')
	dragImg.width = 0;
	dragImg.height = 0;

  let startPosition, tasksWidth

	// get coordinates and width values at the start of resizing
	const startResize = e => {
		e.stopPropagation()
    startPosition = e.clientX // X of resizer element
    tasksWidth = tasksElem.current.offsetWidth // current width of Tasks element
	  e.dataTransfer.setDragImage(dragImg, 0, 0) // set drag image
		e.target.style.cursor = 'col-resize'
	}

	// change width when border is moving
  const resize = e => {
    tasksElem.current.style.width = `${tasksWidth + e.clientX - startPosition}px`
  }

	return (
		<div className={ stl.wrapper } ref={ tasksElem }>
      <div
        className={ stl.resizer }
        draggable={ true }
        onDragStart={ startResize }
        onDrag={ resize }
      />
			<Header/>
			{
				isLoading ?
					<TaskListSkeleton/> :
					<TaskList
						tasks={ tasks }
						setTasks={ setTasks }
					/>
			}
			{
				isLoading ?
					<FooterSkeleton/> :
					<Footer
						total={ tasks.length }
						waiting={ tasks.filter(task => task.status === 'waiting').length }
						inProcess={ tasks.filter(task => task.status === 'inProcess').length }
						complete={ tasks.filter(task => task.status === 'complete').length }
					/>
			}
		</div>
	)
}

export default Tasks