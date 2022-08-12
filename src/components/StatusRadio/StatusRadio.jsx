import stl from './StatusRadio.module.scss'
import {useState} from "react";

function StatusRadio({ status }) {

	let elementClasses = [stl.wrapper]
	let labelText

	const [isChecked, setIsChecked] = useState(false)

	switch (status) {
		case 'waiting':
			labelText = 'ожидает'
			elementClasses.push(stl.waiting)
			break
		case 'inProcess':
			labelText = 'в процессе'
			elementClasses.push(stl.inProcess)
			break
		case 'complete':
			labelText = 'выполнено'
			elementClasses.push(stl.complete)
			break
	}

	const checkRadio = () => {
		setIsChecked(true)
	}

	return (
		<div className={ elementClasses.join(' ') }>

			<label
				className={ stl.label }
				htmlFor={`radio-${status}`}
				onClick={ checkRadio }
			>
				{ labelText }
			</label>

			<input
				type="radio"
				className={ stl.radio }
				id={`radio-${status}`}
				name='taskStatus'
				value={status}
				checked={isChecked}
			/>
		</div>
	)
}

export default StatusRadio