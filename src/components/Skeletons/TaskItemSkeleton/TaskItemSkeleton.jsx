import stl from './TaskItemSkeleton.module.scss'

function TaskItemSkeleton() {
	return (
		<li
			className={ stl.item }
		>
			<div className={ stl.name }></div>
			<div className={ stl.description }></div>
			<div className={ stl.datetime }></div>
		</li>
	)
}

export default TaskItemSkeleton