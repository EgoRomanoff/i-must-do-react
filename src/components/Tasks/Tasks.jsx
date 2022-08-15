import stl from './Tasks.module.scss'
import Header from "../Header/Header"
import TaskList from "../TaskList/TaskList"
import Footer from "../Footer/Footer"
import TaskListSkeleton from "../Skeletons/TaskListSkeleton/TaskListSkeleton"
import FooterSkeleton from "../Skeletons/FooterSkeleton/FooterSkeleton"
import {useContext, useEffect, useRef, useState} from "react"
import { AppContext } from '../../context'

function Tasks({
	               setTasks,
	               selectedTask,
	               setSelectedTask,
	               isLoading,
	               editCallback,
	               deleteCallback,
	               addTaskCallback }) {

	const tasksElem = useRef(null) // ref on this element (use in function fo resizing)
	const [searchValue, setSearchValue] = useState('')
	const [searchResult, setSearchResult] = useState(undefined)

	const { tasks } = useContext(AppContext)

	useEffect(() => {
		if (searchValue === '') {
			setSearchResult(undefined)
		} else {
			const results = tasks.filter(task =>
				task.name.toLowerCase().includes(searchValue.toLowerCase())
			)
			setSearchResult(results)
		}
	}, [searchValue])

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
			<Header
				setSearchValue={ setSearchValue }
				addTaskCallback={ addTaskCallback }
			/>
			{
				isLoading ?
					<TaskListSkeleton/> :
					<TaskList
						setTasks={ setTasks }
						selectedTask={ selectedTask }
						setSelectedTask={ setSelectedTask }
						editCallback={ editCallback }
						deleteCallback={ deleteCallback }
						searchResult={ searchResult }
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