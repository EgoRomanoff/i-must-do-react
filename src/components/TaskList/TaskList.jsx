import stl from './TaskList.module.scss'
import TaskItem from "../TaskItem/TaskItem";

function TaskList() {

	let tasks = [
		{
			id: 1,
			name: 'Название задачи название задачи название задачи название задачи',
			description: 'Описание задачи описание задачи описание задачи описание задачи',
			date: '01.05.2022',
			time: '23:45',
			status: 'inProcess'
		},
		{
			id: 2,
			name: 'Название задачи название задачи название задачи название задачи',
			description: 'Описание задачи',
			date: '01.05.2022',
			time: '23:45',
			status: 'waiting'
		},
		{
			id: 3,
			name: 'Название задачи',
			description: 'Описание задачи описание задачи описание задачи описание задачи',
			date: '01.05.2022',
			time: '23:45',
			status: 'complete'
		},
	]

	return (
		<ul className={ stl.wrapper }>
			{
				tasks.map(task => {
					return (<TaskItem
						key={ task.id }
						name={ task.name }
						description={ task.description }
						date={ task.date }
						time={ task.time }
						status={ task.status }
					/>)
				})
			}
		</ul>
	);
}

export default TaskList;