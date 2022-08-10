import stl from './TaskModal.module.scss'
import IMDButton from "../UI/IMDButton/IMDButton"
import { useRef } from "react"

function TaskModal({ setTasks, taskID, modalType, modalVisible, setModalVisible }) {

	const rootClasses = [stl.wrapper] // get all classes of current element
	const thisModal = useRef(null) // link to current modal
	const status = modalType // setting status for task equal modalType state

	const closeModal = () => {
		setModalVisible(false) // set state to "false"
		// and remove click listener
		document.removeEventListener('click', isModalClickHandler)
	}

	// handler for checking clicks outside the modal
	const isModalClickHandler = e => {
		!thisModal.current.contains(e.target) && closeModal()
	}

	// callback for changing status of current task
	const changeStatus = () => {
		setTasks(tasks => {
			// loop over the tasks
			return tasks.map(task => {
				//find the provided id and updates status
				//else returns unmodified item
				return task.id === taskID ? {...task, status: status} : task
			})
		})
		closeModal()
	}

	// callback for deleting current task
	const deleteTask = () => {
		setTasks(tasks => { // returns an array without deleted task
			return tasks.filter(task => task.id !== taskID)
		})
		closeModal()
	}

	// text in modal and function depend from modalType
	let modalText, modalCallback
	// so if modal must be visible
	if (modalVisible) {
		// check modalType and set text and callback
		switch (modalType) {
			case 'inProcess':
				modalText = 'Начать выполнять эту задачу?'
				modalCallback = changeStatus
				break
			case 'complete':
				modalText = 'Пометить эту задачу выполненной?'
				modalCallback = changeStatus
				break
			case 'delete':
				modalText = 'Удалить эту задачу?'
				modalCallback = deleteTask
				break
			default:
				break
		}

		// add class "show", if modal visibility state is "true"
		rootClasses.push(stl.show)
		// add listener for catching clicks outside the modal
		document.addEventListener('click', isModalClickHandler)
	}

	return (
		<div className={rootClasses.join(' ')} id={ `modal-${taskID}` } ref={thisModal}>
			<span className={ stl.text }>{ modalText }</span>
			<div className={ stl.btns }>
				<IMDButton
					text='Да'
					type='enter'
					size='sm'
					onClick={ modalCallback }
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