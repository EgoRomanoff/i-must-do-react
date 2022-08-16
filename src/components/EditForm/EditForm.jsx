import stl from './EditForm.module.scss'
import IMDTextArea from "../UI/IMDTextArea/IMDTextArea"
import StatusRadio from "../StatusRadio/StatusRadio"
import IMDInput from "../UI/IMDInput/IMDInput"
import { useContext, useEffect, useRef, useState} from "react"
import IMDButton from "../UI/IMDButton/IMDButton"
import { AppContext } from "../../context"

function EditForm({ taskData, isLoading, setTasks }) {

	const { selectedTask, setSelectedTask, editTask, deleteTask } = useContext(AppContext)
	// const [taskData, setTaskData] = useState()  // data from selectedTask state (using for setting input values)
	const [prevData, setPrevData] = useState()  // previous task data (using in canceling of task editing)
	// const [modalState, setModalState] = useState({  // parameters of modal element
	// 	isVisible: false,
	// 	question: '',
	// 	callback: undefined
	// })
	const thisForm = useRef()                   // reference on task form

	// useEffect(() => {
	// 	setTaskData(selectedTask.task)
	// }, [selectedTask])

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
			// setTaskData(prevData)            // set to taskData state previous data
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

	return (
		<form className={ stl.inner } ref={ thisForm }>
			<IMDTextArea
				className={ stl.name }
				taskDataType='name'
				data={ selectedTask.task.name }
				isEdited={ true }
			/>

			<StatusRadio
				data={ selectedTask.task.status }
				isEdited={ true }
			/>

			<IMDTextArea
				className={ stl.description }
				taskDataType='description'
				data={ selectedTask.task.description || '' }
				isEdited={ true }
			/>

			<div className={ stl.datetime }>
				<IMDInput
					taskDataType='date'
					data={ selectedTask.task.date || '' }
					isEdited={ true }
				/>
				<IMDInput
					taskDataType='time'
					data={ selectedTask.task.time || '' }
					isEdited={ true }
				/>
			</div>

			<div className={ stl.btns }>
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
			</div>
		</form>
	)
}

export default EditForm