import stl from './TaskList.module.scss'
import TaskItem from "../TaskItem/TaskItem"

function TaskList({ tasks, setTasks, setSelectedTask }) {

	const isTasksEmpty = () => {
		if (tasks.length) {
			return tasks.map(task => {
				return (
					<TaskItem
						key={ task.id }
						task={ task }
						setTasks={ setTasks }
						setSelectedTask={ setSelectedTask }
					/>
				)
			})
		} else {
			return <span className={ stl.emptyMessage }>Задач нет</span>
		}
	}

	return (
		<ul className={ stl.wrapper }>
			{ isTasksEmpty() }
		</ul>
	)
}

export default TaskList