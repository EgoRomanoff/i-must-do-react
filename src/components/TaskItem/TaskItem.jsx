import stl from './TaskItem.module.scss'
import './TaskItem.scss'
import IMDButton from "../UI/IMDButton/IMDButton"
import TaskModal from "../TaskModal/TaskModal"
import {useRef, useState} from "react"

function TaskItem({ task, setTasks }) {

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
		console.log(modalState.isVisible)
		// e.stopPropagation()
		switch (btnType) {
			case 'complete':
				setModalState({
					isVisible: true,
					question: 'Пометить задачу выполненной?',
					callback: () => changeStatus('complete')
				})
				console.log(modalState.isVisible)
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

	return (
		<li
			id={ task.id }
			className={`${ stl.item } task--${task.status}`}
		>
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
							<span className={ stl.date }>{ task.date }</span> :
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