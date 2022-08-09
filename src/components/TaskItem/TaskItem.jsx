import stl from './TaskItem.module.scss'
import './TaskItem.scss'
import IMDButton from "../UI/IMDButton/IMDButton";

function TaskItem({name, description, date, time, status}) {

	// const setActive = e => {
	// 	e.preventDefault()
	// 	e.stopPropagation()
	// 	console.log(e.target)
	// 	e.target.classList.add('active')
	// }

	return (
		<li
			className={`${ stl.item } task--${status}`}
			// onClick={ setActive }
		>
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
			<div className={ stl.btns }>
				<IMDButton
					type='complete'
					size='sm'
				/>
				<IMDButton
					type='edit'
					size='sm'
				/>
				<IMDButton
					type='inProcess'
					size='sm'
				/>
				<IMDButton
					type='delete'
					size='sm'
				/>
			</div>
		</li>
	);
}

export default TaskItem;