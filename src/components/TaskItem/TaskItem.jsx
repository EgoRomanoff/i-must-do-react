import stl from './TaskItem.module.scss'
import './TaskItem.scss'
import IMDButton from "../UI/IMDButton/IMDButton"
import TaskModal from "../TaskModal/TaskModal"
import {useState} from "react"

function TaskItem({ task, setTasks }) {

	const [modalVisible, setModalVisible] = useState(false)
	const [modalType, setModalType] = useState(null)

	const showModal = e => {
		e.stopPropagation()
		let btnType = Array.from(e.target.classList)[1]
		switch (btnType) {
			case 'btn--complete':
				setModalType('complete')
				break
			case 'btn--inProcess':
				setModalType('inProcess')
				break
			case 'btn--delete':
				setModalType('delete')
				break
			default:
				console.log(btnType)
		}
		setModalVisible(true)
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
					onClick={ showModal }
				/>
				<IMDButton
					type='complete'
					size='sm'
					onClick={ showModal }
				/>
				<IMDButton
					type='edit'
					size='sm'
				/>
				<IMDButton
					type='delete'
					size='sm'
					onClick={ showModal }
				/>
			</div>
			<TaskModal
				setTasks={ setTasks }
				taskID={ task.id }
				modalType={ modalType }
				modalVisible={ modalVisible }
				setModalVisible={ setModalVisible }
			/>
		</li>
	);
}

export default TaskItem;