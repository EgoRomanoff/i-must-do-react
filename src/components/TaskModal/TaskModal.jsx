import stl from './TaskModal.module.scss'
import IMDButton from "../UI/IMDButton/IMDButton";

function TaskModal({ setTasks, taskID, modalType, modalVisible, setModalVisible }) {

	const rootClasses = [stl.wrapper] // get all classes of current element

	if (modalVisible) { // add class "show", if modal visible state is "true"
		rootClasses.push(stl.show)
	}

	let modalText
	switch (modalType) {
		case 'setInProcess':
			modalText = 'Начать выполнять эту задачу?'
			break
		case 'setComplete':
			modalText = 'Пометить эту задачу выполненной?'
			break
		case 'delete':
			modalText = 'Удалить эту задачу?'
			break
		default:
			break
	}

	const changeStatus = (taskID, status) => {
		setTasks(tasks => {
			// loop over the todos list and find the provided id.
			return tasks.map(task => {
				//gets everything that was already in item, and updates status
				//else returns unmodified item
				return task.id === taskID ? {...task, status: status} : task
			})
		})
	}

	const deleteTask = (taskID) => {
		setTasks(tasks => { // returns an array without deleted task
			return tasks.filter(task => task.id !== taskID)
		})
	}

	const doModalQuestion = () => {
		switch (modalType) {
			case 'setInProcess':
				changeStatus(taskID, 'inProcess')
				break
			case 'setComplete':
				changeStatus(taskID, 'complete')
				break
			case 'delete':
				deleteTask(taskID)
				break
			default:
				break
		}
		closeModal()
	}

	const closeModal = () => {
		setModalVisible(false)
	}

	return (
		<div className={rootClasses.join(' ')}>
			<span className={ stl.text }>{ modalText }</span>
			<div className={ stl.btns }>
				<IMDButton
					text='Да'
					type='enter'
					size='sm'
					onClick={ doModalQuestion }
				/>
				<IMDButton
					text='Нет'
					type='cancel'
					size='sm'
					onClick={ closeModal }
				/>
			</div>
		</div>
	);
}

export default TaskModal;