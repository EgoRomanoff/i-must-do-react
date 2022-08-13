import stl from './TaskForm.module.scss'
import IMDTextArea from "../UI/IMDTextArea/IMDTextArea"
import StatusRadio from "../StatusRadio/StatusRadio"
import IMDInput from "../UI/IMDInput/IMDInput"
import {useEffect, useState} from "react"

function TaskForm({ isLoading, selectedTask }) {

	const [taskData, setTaskData] = useState(selectedTask)

	useEffect(() => {
		setTaskData(selectedTask)
	}, [selectedTask])

	return (
		<form className={ stl.wrapper } id='task-form'>
			{
				isLoading ?
					<div className={ stl.loading }>
						<svg width="58" height="16" viewBox="0 0 58 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="preloader">
							<path id="1" d="M37 8C37 12.4183 33.4183 16 29 16C24.5817 16 21 12.4183 21 8C21 3.58172 24.5817 0 29 0C33.4183 0 37 3.58172 37 8Z" fill="#2D8D79"/>
							<path id="2" d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8Z" fill="#2D8D79"/>
							<path id="3" d="M58 8C58 12.4183 54.4183 16 50 16C45.5817 16 42 12.4183 42 8C42 3.58172 45.5817 0 50 0C54.4183 0 58 3.58172 58 8Z" fill="#2D8D79"/>
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

							<span className={ stl.descriptionTitle }>
								Описание
							</span>

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
						</> :
						<div>Выберите задачу</div>
			}
		</form>
	);
}

export default TaskForm