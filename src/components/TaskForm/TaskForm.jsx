import stl from './TaskForm.module.scss'
import IMDTextArea from "../UI/IMDTextArea/IMDTextArea"
import StatusRadio from "../StatusRadio/StatusRadio"
import IMDInput from "../UI/IMDInput/IMDInput"
import {useEffect, useRef, useState} from "react"
import IMDButton from "../UI/IMDButton/IMDButton"
import TaskModal from "../TaskModal/TaskModal";

function TaskForm({
	                  isLoading,
										setTasks,
	                  selectedTask,
	                  setSelectedTask,
	                  editCallback,
	                  deleteCallback,
	                  editedTaskPrevData,
										setEditedTaskPrevData,
										maxID,
}) {

	const [taskData, setTaskData] = useState(selectedTask)
	const thisForm = useRef() // reference on task form
	const [modalState, setModalState] = useState({
		isVisible: false,
		question: null,
		callback: null
	})

	useEffect(() => {
		setTaskData(selectedTask)
	}, [selectedTask])

	// cancel editing process
	const cancelEditing = () => {
		// finish editing
		if (selectedTask.isAdded) {
			setSelectedTask({
				task: undefined,
				isEdited: false,
				isAdded: false
			})
		} else {
			setSelectedTask(prevState => {
				return {...prevState, isEdited: false, isAdded: false}
			})
			// set to taskData state previous data
			setTaskData(editedTaskPrevData)
			// clear previous task data state in App
			setEditedTaskPrevData(undefined)
		}
	}

	// accept changes in edited task
	const confirmEditing = () => {
		// get collection of all task form's children
		const formElements = thisForm.current.elements
		// collect necessary values in object
		const creatingTaskData = {
			// get task id from taskData state
			id: selectedTask.isAdded ? +maxID + 1 : taskData.task.id,
			name: formElements.name.value,
			description: formElements.description.value,
			date: formElements.date.value,
			time: formElements.time.value,
			status: formElements.status.value
		}

		if (selectedTask.isAdded) {
			setTasks(prevState => {
				return [...prevState, creatingTaskData]
			})
		} else {
			// set edited data to tasks array in App
			setTasks(prevState => {
				// loop over the tasks
				return prevState.map(task => {
					//find the provided id and update data
					//else returns unmodified item
					return task.id === taskData.task.id ?
						{...creatingTaskData} :
						task
				})
			})
		}

		// set edited data to selectedTask state and finish editing
		setSelectedTask(prevState => {
			return {...prevState, task: {...creatingTaskData}, isEdited: false, isAdded: false}
		})
	}

	const confirmDelete = () => {
		setModalState({
			isVisible: true,
			question: 'Удалить задачу?',
			callback: deleteCallback
		})
	}

	return (
		<form className={ stl.wrapper } id='task-form' ref={ thisForm }>
			{
				isLoading ?
					<div className={ stl.loading }>
						<svg width="100%" height="12" viewBox="0 0 42 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={ stl.preloader }>
							<path d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6Z" fill="#2D8D79"/>
							<path d="M27 6C27 9.31371 24.3137 12 21 12C17.6863 12 15 9.31371 15 6C15 2.68629 17.6863 0 21 0C24.3137 0 27 2.68629 27 6Z" fill="#2D8D79"/>
							<path d="M42 6C42 9.31371 39.3137 12 36 12C32.6863 12 30 9.31371 30 6C30 2.68629 32.6863 0 36 0C39.3137 0 42 2.68629 42 6Z" fill="#2D8D79"/>
						</svg>
					</div> :
					taskData.task ?
						<>
							<IMDTextArea
								className={ stl.name }
								taskDataType='name'
								data={ taskData.task.name }
								isEdited={ taskData.isEdited }
							/>

							<StatusRadio
								data={ taskData.task.status }
								isEdited={ taskData.isEdited }
							/>

							<IMDTextArea
								className={ stl.description }
								taskDataType='description'
								data={ taskData.task.description || '' }
								isEdited={ taskData.isEdited }
							/>

							<div
								className={
									`${stl.datetime} ${taskData.isEdited && stl.edited}`
								}
							>
								<IMDInput
									taskDataType='date'
									data={ taskData.task.date || '' }
									isEdited={ taskData.isEdited }
								/>
								<IMDInput
									taskDataType='time'
									data={ taskData.task.time || '' }
									isEdited={ taskData.isEdited }
								/>
							</div>
							<div className={ stl.btns }>
								{
									selectedTask.isEdited ?
										<>
											<IMDButton
												text='Сохранить'
												type='save'
												size='lg'
												onClick={ confirmEditing }
											/>
											<IMDButton
												text='Отмена'
												type='cancel'
												size='lg'
												onClick={ cancelEditing }
											/>
										</> :
										<>
											<IMDButton
												text='Редактировать'
												type='edit'
												size='lg'
												onClick={ () => editCallback(taskData.task) }
											/>
											<IMDButton
												text='Удалить'
												type='delete'
												size='lg'
												onClick={ confirmDelete }
											/>
										</>
								}
							</div>
							{
								modalState.isVisible ?
									<TaskModal
										isVisible={ modalState.isVisible }
										setModalState={ setModalState }
										text={ modalState.question }
										callback={ modalState.callback }
										size='lg'
									/> :
									null
							}
						</> :
						<div className={ stl.empty }>
							Выберите задачу<br/>
							или создайте новую
						</div>
			}
		</form>
	)
}

export default TaskForm