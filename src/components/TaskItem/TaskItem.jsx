import stl from './TaskItem.module.scss'
import './TaskItem.scss'

function TaskItem({name, description, date, time, status}) {
	return (
		<li className={`${ stl.item } task--${status}`}>
			<span className={ stl.name }>{name}</span>
			<p className={ stl.description }>{description}</p>
			<p className={ stl.datetime }>
				<span>{date}</span>
				<span>{time}</span>
			</p>
		</li>
	);
}

export default TaskItem;