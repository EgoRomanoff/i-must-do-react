import stl from './TaskItem.module.scss'
import IMDButton from "../UI/IMDButton/IMDButton"
import TaskModal from "../TaskModal/TaskModal"
import {useState} from "react"
import TaskItemData from "../TaskItemData/TaskItemData"

function TaskItem({ task, setTasks, setSelectedTask }) {

	let elemClasses = [stl.wrapper] // get necessary CSS-classes and set in array

	switch (task.status) { // check task status and add needed CSS-class
		case 'waiting':
			elemClasses.push(stl.taskWaiting)
			break
		case 'inProcess':
			elemClasses.push(stl.taskInProcess)
			break
		case 'complete':
			elemClasses.push(stl.taskComplete)
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
			// Turn array into string and set CSS-classes
			className={ elemClasses.join(' ') }
			id={ task.id }
		>
			<div className={ stl.inner } onClick={ selectTask }>
				<span className={ stl.name }>{ task.name }</span>

				{ // check description presence
					task.description ?
						<TaskItemData
							className={ stl.description }
							type='description'
							data={ task.description }
						/> :
						null
				}

				{ // check date AND time presence
					(task.date !== null || task.time !== null) ?
						<div className={ stl.datetime }>
							{ // check date presence
								task.date ?
									<TaskItemData
										className={ stl.date }
										type='date'
										data={ task.date }
									/> :
									null
							}
							{ // check time presence
								task.time ?
									<TaskItemData
										className={ stl.time }
										type='time'
										data={ task.time }
									/> :
									null
							}
						</div> :
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
	)
}

export default TaskItem;