import stl from './TaskItem.module.scss'
import './TaskItem.scss'

function TaskItem({name, description, date, time, status}) {

	return (
		<li className={`${ stl.item } task--${status}`}>
			<span className={ stl.name }>{name}</span>
			{description ? <p className={ stl.description }>{description}</p> : null}
			{
				(date !== null || time !== null) ?
					<p className={ stl.datetime }>
						{date ? <span className={ stl.date }>{date}</span> : null}
						{time ? <span className={ stl.time }>{time}</span> : null}
					</p> :
					null
			}
		</li>
	);
}

export default TaskItem;