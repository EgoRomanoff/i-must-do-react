import stl from './TaskForm.module.scss'
import IMDTextArea from "../UI/IMDTextArea/IMDTextArea"
import StatusRadio from "../StatusRadio/StatusRadio"
import IMDInput from "../UI/IMDInput/IMDInput"
import {Fragment, useContext, useEffect, useRef, useState} from "react"
import IMDButton from "../UI/IMDButton/IMDButton"
import TaskModal from "../TaskModal/TaskModal"
import TaskFormPreloader from "../TaskFormPreloader/TaskFormPreloader"
import { AppContext } from "../../context"
import EditForm from "../EditForm/EditForm";
import ViewForm from "../ViewForm/ViewForm";

function TaskForm({ isLoading, setTasks }) {

	const { selectedTask, setSelectedTask, editTask, deleteTask } = useContext(AppContext)
	const [taskData, setTaskData] = useState()  // data from selectedTask state (using for setting input values)
	const [prevData, setPrevData] = useState()  // previous task data (using in canceling of task editing)
	const [modalState, setModalState] = useState({  // parameters of modal element
		isVisible: false,
		question: '',
		callback: undefined
	})
	const thisForm = useRef()                   // reference on task form

	useEffect(() => {
		setTaskData(selectedTask.task)
	}, [selectedTask])

	const closeForm = () => {
		setSelectedTask({                // set default data to selectedItem state (App)
			task: undefined,
			isEdited: false,
			isAdded: false
		})
	}

	const cancelEditing = () => {        // cancel task editing process
		setPrevData(selectedTask.task)

		if (selectedTask.isAdded) {        // if new task is added
			setSelectedTask({                // set default data to selectedItem state (App)
				task: undefined,
				isEdited: false,
				isAdded: false
			})                               // and finish process
		} else {
			setSelectedTask({                // else finish editing process
				task: selectedTask.task,       // with previous selected task data
				isEdited: false,
				isAdded: false
			})
			setTaskData(prevData)            // set to taskData state previous data
		}
	}

	const confirmEditing = () => {                     // accept changes in edited task
		const formElements = thisForm.current.elements   // get collection of all task form's children
		const creatingTaskData = {                       // collect necessary values in object
			id: selectedTask.task.id,
			name: formElements.name.value,
			description: formElements.description.value,
			date: formElements.date.value,
			time: formElements.time.value,
			status: formElements.status.value
		}

		if (selectedTask.isAdded) {                      // if new task is adding
			setTasks(prevState => {                        // set created task to tasks state (App)
				return [...prevState, creatingTaskData]
			})
		} else {
			setTasks(prevState => {                        // set edited task to tasks state (App)
				return prevState.map(task => {               // loop over the tasks
					return task.id === selectedTask.task.id ?  // find the edited task
						{...creatingTaskData} :                  // and update data
						task                                     // else returns unmodified item
				})
			})
		}

		setSelectedTask({
			task: {...creatingTaskData},                   // set edited data to selectedTask state
			isEdited: false,                               // and finish editing
			isAdded: false
		})
	}

	const confirmDelete = () => {      // accept removing task
		setModalState({            // set state of modal
			isVisible: true,
			question: 'Удалить задачу?',
			callback: deleteTask
		})
	}

	return (
		<div className={ stl.wrapper } ref={ thisForm }>
			{
				isLoading ?
					<TaskFormPreloader/> :
					taskData ?
						selectedTask.isEdited ?
							<EditForm/> :
							<ViewForm/> :
						<div className={ stl.empty }>
							Выберите задачу<br/>
							или создайте новую
						</div>
						// <Fragment>
						// 	<IMDTextArea
						// 		className={`${stl.name}  ${selectedTask.isEdited && stl.edited}`}
						// 		taskDataType='name'
						// 		data={ taskData.name }
						// 		isEdited={ selectedTask.isEdited }
						// 	/>
						//
						// 	<StatusRadio
						// 		data={ taskData.status }
						// 		isEdited={ selectedTask.isEdited }
						// 	/>
						//
						// 	<IMDTextArea
						// 		className={`${stl.description} ${selectedTask.isEdited && stl.edited}`}
						// 		taskDataType='description'
						// 		data={ taskData.description || '' }
						// 		isEdited={ selectedTask.isEdited }
						// 	/>
						//
						// 	<div
						// 		className={
						// 			`${stl.datetime} ${selectedTask.isEdited && stl.edited}`
						// 		}
						// 	>
						// 		<IMDInput
						// 			taskDataType='date'
						// 			data={ taskData.date || '' }
						// 			isEdited={ selectedTask.isEdited }
						// 		/>
						// 		<IMDInput
						// 			taskDataType='time'
						// 			data={ taskData.time || '' }
						// 			isEdited={ selectedTask.isEdited }
						// 		/>
						// 	</div>
						// 	<div className={ stl.btns }>
						// 		{
						// 			selectedTask.isEdited ?
						// 				<>
						// 					<IMDButton
						// 						text='Сохранить'
						// 						type='save'
						// 						size='lg'
						// 						onClick={ confirmEditing }
						// 					/>
						// 					<IMDButton
						// 						text='Отмена'
						// 						type='cancel'
						// 						size='lg'
						// 						onClick={ cancelEditing }
						// 					/>
						// 				</> :
						// 				<>
						// 					<IMDButton
						// 						text='Редактировать'
						// 						type='edit'
						// 						size='lg'
						// 						onClick={ () => editTask() }
						// 					/>
						// 					<IMDButton
						// 						text='Удалить'
						// 						type='delete'
						// 						size='lg'
						// 						onClick={ confirmDelete }
						// 					/>
						// 					<IMDButton
						// 						text='Закрыть'
						// 						type='close'
						// 						size='lg'
						// 						onClick={ closeForm }
						// 					/>
						// 				</>
						// 		}
						// 	</div>
						// 	{
						// 		modalState.isVisible ?
						// 			<TaskModal
						// 				isVisible={ modalState.isVisible }
						// 				setModalState={ setModalState }
						// 				text={ modalState.question }
						// 				callback={ modalState.callback }
						// 				size='lg'
						// 			/> :
						// 			null
						// 	}
						// </Fragment> :
			}
		</div>
	)
}

export default TaskForm