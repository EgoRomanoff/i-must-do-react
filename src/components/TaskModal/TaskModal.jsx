import stl from './TaskModal.module.scss'
import IMDButton from "../UI/IMDButton/IMDButton"
import {useRef} from "react"

function TaskModal({ isVisible, setModalState, text, callback }) {

	const thisModal = useRef(null) // link to current modal

	const closeModal = () => {
		// set modalState to default values
		setModalState({
			isVisible: false,
			question: null,
			callback: null
		})
		// and remove click listener
		document.removeEventListener('click', isModalClickHandler)
	}

	// handler for checking clicks outside the modal
	const isModalClickHandler = e => {
		// console.log(thisModal.current)
		!thisModal.current.contains(e.target) && closeModal()
	}

	if (isVisible === true) {
		setTimeout(() => {
			document.addEventListener('click', isModalClickHandler)
		}, 0)
	}

	return (
		<div className={ stl.wrapper } ref={ thisModal }>
			<span className={ stl.text }>
				{ text }
			</span>
			<div className={ stl.btns }>
				<IMDButton
					text='Да'
					type='enter'
					size='sm'
					onClick={ () => {
						callback()
						closeModal()
					} }
				/>
				<IMDButton
					text='Нет'
					type='cancel'
					size='sm'
					onClick={ closeModal }
				/>
			</div>
		</div>
	)
}

export default TaskModal