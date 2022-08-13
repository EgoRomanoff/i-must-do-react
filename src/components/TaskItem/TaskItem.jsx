import stl from './TaskItem.module.scss'
import IMDButton from "../UI/IMDButton/IMDButton"
import TaskModal from "../TaskModal/TaskModal"
import {useState} from "react"

function TaskItem({ task, setTasks, setSelectedTask }) {

	let elementClasses = [stl.wrapper] // get CSS-class 'wrapper' and set in array

	switch (task.status) { // check task status and add needed CSS-class
		case 'waiting':
			elementClasses.push(stl.taskWaiting)
			break
		case 'inProcess':
			elementClasses.push(stl.taskInProcess)
			break
		case 'complete':
			elementClasses.push(stl.taskComplete)
			break
	}

	// state of modal window
	const [modalState, setModalState] = useState({
		isVisible: false,
		question: null,
		callback: null
	})

	// callback for changing status of current task
	const changeStatus = (status) => {
		setTasks(tasks => {
			// loop over the tasks
			return tasks.map(taskItem => {
				//find the provided id and updates status
				//else returns unmodified item
				return taskItem.id === task.id ?
					{...taskItem, status: status} :
					taskItem
			})
		})
	}

	// callback for deleting current task
	const deleteTask = () => {
		// returns an array without deleted task
		setTasks(tasks => {
			return tasks.filter(taskItem => taskItem.id !== task.id)
		})
	}

	// open modal and set parameters
	const showModal = (btnType) => {
		// read 'btnType' and set needed ModalState
		switch (btnType) {
			case 'complete':
				setModalState({
					isVisible: true,
					question: 'Пометить задачу выполненной?', // text in Modal
					callback: () => changeStatus('complete') // callback for enter button
				})
				break
			case 'inProcess':
				setModalState({
					isVisible: true,
					question: 'Начать выполнение задачи?',
					callback: () => changeStatus('inProcess')
				})
				break
			case 'delete':
				setModalState({
					isVisible: true,
					question: 'Удалить задачу?',
					callback: deleteTask
				})
				break
			default:
				break
		}
	}

	const convertDate = (date) => {
		const dateRegExp = /(\d{4})-(\d{2})-(\d{2})/
		return date.replace(dateRegExp, '$3.$2.$1')
			// dateFromItem = /(\d{2})\.(\d{2})\.(\d{4})/
		// return dateFromInput.test(dateValue)
		// 	? dateValue.replace(dateFromInput, '$3.$2.$1')
		// 	: dateValue.replace(dateFromItem, '$3-$2-$1')
	}

	const selectTask = e => {
		e.stopPropagation()
		setSelectedTask({
			task: task,
			isEdited: false
		})
	}

	const editTask = e => {
		setSelectedTask({
			task: task,
			isEdited: true
		})
	}

	return (
		<li
			id={ task.id }
			className={elementClasses.join(' ')} // put CSS-classes array as string with " " divider
		>
			<div className={ stl.inner } onClick={ selectTask }>
				<span className={ stl.name }>{ task.name }</span>

				{
					task.description ?
						<p className={ stl.description }>{ task.description }</p> :
						null
				}

				{
					(task.date !== null || task.time !== null) ?
						<p className={ stl.datetime }>
							{
								task.date ?
									<span className={ stl.date }>{ convertDate(task.date) }</span> :
									null
							}
							{
								task.time ?
									<span className={ stl.time }>{ task.time }</span> :
									null
							}
						</p> :
						null
				}
			</div>

			<div className={ stl.btns }>

				<IMDButton
					type='inProcess'
					size='sm'
					onClick={ () => showModal('inProcess') }
				/>

				<IMDButton
					type='complete'
					size='sm'
					onClick={ () => showModal('complete') }
				/>

				<IMDButton
					type='edit'
					size='sm'
					onClick={ () => editTask() }
				/>

				<IMDButton
					type='delete'
					size='sm'
					onClick={ () => showModal('delete') }
				/>

			</div>

			{
				modalState.isVisible ?
					<TaskModal
						isVisible={ modalState.isVisible }
						setModalState={ setModalState }
						text={ modalState.question }
						callback={ modalState.callback }
					/> :
					null
			}
		</li>
	);
}

export default TaskItem;