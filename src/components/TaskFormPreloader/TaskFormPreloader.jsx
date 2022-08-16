import stl from './TaskFormPreloader.module.scss'

function TaskFormPreloader() {
	return (
		<div className={ stl.preloader }>
			<svg width="100%" height="12" viewBox="0 0 42 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={ stl.img }>
				<path d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6Z" fill="#2D8D79"/>
				<path d="M27 6C27 9.31371 24.3137 12 21 12C17.6863 12 15 9.31371 15 6C15 2.68629 17.6863 0 21 0C24.3137 0 27 2.68629 27 6Z" fill="#2D8D79"/>
				<path d="M42 6C42 9.31371 39.3137 12 36 12C32.6863 12 30 9.31371 30 6C30 2.68629 32.6863 0 36 0C39.3137 0 42 2.68629 42 6Z" fill="#2D8D79"/>
			</svg>
		</div>
	)
}

export default TaskFormPreloader