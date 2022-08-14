import stl from './IMDInput.module.scss'
import {useEffect, useState} from "react"

function IMDInput({ taskDataType, data, isEdited }) {

	const [value, setValue] = useState('')

	useEffect(() => {
		setValue(data)
	}, [data])

	const onChangeHandler = e => {
		setValue(e.target.value)
	}

	let inputType
	switch (taskDataType) {
		case 'date':
			inputType= 'date'
			break
		case 'time':
			inputType= 'time'
			break
	}

	return (
		<div className={ stl.wrapper }>
			<input
				className={ stl.input }
				type={ inputType }
				readOnly={ !isEdited }
				value={ value }
				onChange={ onChangeHandler }
				name={ taskDataType }
			/>
		</div>
	)
}

export default IMDInput