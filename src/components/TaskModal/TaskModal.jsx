import stl from './TaskModal.module.scss'
import IMDButton from "../UI/IMDButton/IMDButton"
import {useRef} from "react"

function TaskModal({ className, isVisible, setModalState, text, callback, size }) {

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
		<>
			{
				size === 'lg' ?
					<div className={ stl.overlay }></div> :
					null
			}
			<div
				className={`${ stl.wrapper } ${ size === 'lg' ? stl.modalLG : stl.modalSM }`}
				ref={ thisModal }>
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
		</>
	)
}

export default TaskModal