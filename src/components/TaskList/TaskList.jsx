import stl from './TaskList.module.scss'
import TaskItem from "../TaskItem/TaskItem"

function TaskList({ tasks, setTasks }) {

	const isTasksEmpty = arr => {
		if (arr.length) {
			return tasks.map(task => {
				return (
					<TaskItem
						key={ task.id }
						task={ task }
						setTasks={ setTasks }
					/>
				)
			})
		} else {
			return <span className={ stl.emptyMessage }>Задач нет</span>
		}
	}

	return (
		<ul className={ stl.wrapper }>
			{isTasksEmpty(tasks)}
		</ul>
	)
}

export default TaskList