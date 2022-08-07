import stl from './TaskList.module.scss'
import TaskItem from "../TaskItem/TaskItem";

function TaskList({ tasks }) {

	const isTasksEmpty = arr => {
		console.log(arr.length)
		if (arr.length) {
			return tasks.map(task => {
				return (<TaskItem
					key={ task.id }
					name={ task.name }
					description={ task.description }
					date={ task.date }
					time={ task.time }
					status={ task.status }
				/>)
			})
		} else {
			return <span className={ stl.emptyMessage }>Задач нет</span>
		}
	}

	return (
		<ul className={ stl.wrapper }>
			{/*{*/}
			{/*	tasks.map(task => {*/}
			{/*		return (<TaskItem*/}
			{/*			key={ task.id }*/}
			{/*			name={ task.name }*/}
			{/*			description={ task.description }*/}
			{/*			date={ task.date }*/}
			{/*			time={ task.time }*/}
			{/*			status={ task.status }*/}
			{/*		/>)*/}
			{/*	})*/}
			{/*}*/}
			{isTasksEmpty(tasks)}
		</ul>
	);
}

export default TaskList;