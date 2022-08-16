import stl from './ViewForm.module.scss'
import StatusRadio from "../StatusRadio/StatusRadio"
import { useContext, useRef, useState } from "react"
import IMDButton from "../UI/IMDButton/IMDButton"
import TaskModal from "../TaskModal/TaskModal"
import { AppContext } from "../../context"

function ViewForm() {

	const { selectedTask, setSelectedTask, editTask, deleteTask } = useContext(AppContext)
	const [modalState, setModalState] = useState({  // parameters of modal element
		isVisible: false,
		question: '',
		callback: undefined
	})
	const thisForm = useRef()                   // reference on task form

	const confirmDelete = () => {      // accept removing task
		setModalState({            // set state of modal
			isVisible: true,
			question: 'Удалить задачу?',
			callback: deleteTask
		})
	}

	const closeForm = () => {
		setSelectedTask({                // set default data to selectedItem state (App)
			task: undefined,
			isEdited: false,
			isAdded: false
		})
	}

	return (
		<form className={ stl.inner } ref={thisForm}>
			<h4 className={ stl.title }>Просмотр задачи</h4>
			<span className={ stl.name }>{ selectedTask.task.name }</span>

			<StatusRadio
				data={ selectedTask.task.status }
				isEdited={ false }
			/>
			{
				selectedTask.task.description && (
					<span className={ stl.description }>
						{ selectedTask.task.description }
					</span>
				)
			}

			<div className={ stl.datetime }>
				<span className={ stl.date }>{ selectedTask.task.date }</span>
				<span className={ stl.time }>{ selectedTask.task.time }</span>
			</div>

			<div className={ stl.btns }>
				<IMDButton
					text='Редактировать'
					type='edit'
					size='lg'
					onClick={ () => editTask() }
				/>
				<IMDButton
					text='Удалить'
					type='delete'
					size='lg'
					onClick={ confirmDelete }
				/>
				<IMDButton
					text='Закрыть'
					type='close'
					size='lg'
					onClick={ closeForm }
				/>
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
		</form>
	)
}

export default ViewForm