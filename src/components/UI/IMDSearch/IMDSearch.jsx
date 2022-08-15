import stl from './IMDSearch.module.scss'
import {useState} from "react"

function IMDSearch({ setSearchValue }) {

	const [inputValue, setInputValue] = useState('')

	const onChangeHandler = e => {
		setSearchValue(e.target.value)
		setInputValue(e.target.value)
	}

	return (
		<div className={`${stl.wrapper}`}>
			<input
				className={ stl.input }
				type="search"
				placeholder="Найти задачу..."
				value={ inputValue }
				onChange={ onChangeHandler }
			/>
		</div>
	)
}

export default IMDSearch