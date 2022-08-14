import stl from './IMDTextArea.module.scss'
import {useEffect, useLayoutEffect, useRef, useState} from "react"

function IMDTextArea({ className, taskDataType, data, isEdited }) {

	const [value, setValue] = useState('')
	const thisTextarea = useRef(null)

	useEffect(() => {
		setValue(data)
	}, [data])

	let minHeight, placeholder
	switch (taskDataType) {
		case 'name':
			minHeight = 44
			placeholder = 'Введите название задачи...'
			break
		case 'description':
			minHeight = 38
			placeholder = 'Нет описания...'
			break
	}

	useLayoutEffect(() => {
		thisTextarea.current.style.height = 'inherit'

		thisTextarea.current.style.height = `${Math.max(
			thisTextarea.current.scrollHeight,
			minHeight
		)}px`
		
	}, [value])

	const onChangeHandler = e => {
		setValue(e.target.value)
	}

	return (
		<div className={`${stl.wrapper} ${className} ${isEdited && stl.edited}`}>
			<textarea
				className={ stl.input }
				readOnly={ !isEdited }
				ref={ thisTextarea }
				value={ value }
				onChange={ onChangeHandler }
				rows='1'
				placeholder={ placeholder }
				name={ taskDataType }
			/>
		</div>
	)
}

export default IMDTextArea