import stl from './StatusRadio.module.scss'
import {useState} from "react";

function StatusRadio(taskStatus) {

	// let inputClasses = [stl.input]
	let labelText

	const [status, setStatus] = useState('waiting')

	const checkingRadio = e => {
		setStatus(e.target.value)
	}

	return (
		<div className={ stl.wrapper }>
			<div className={ `${ stl.input } ${ stl.waiting }` }>
				<input
					type="radio"
					name='taskStatus'
					value='waiting'
					id='radio-waiting'
					className={ stl.radio }
					checked={ status === 'waiting'}
					onChange={ checkingRadio }
				/>
				<label
					className={ stl.label }
					htmlFor='radio-waiting'
				>
					ожидает
				</label>
			</div>

			<div className={ `${ stl.input } ${ stl.inProcess }` }>
				<input
					type="radio"
					name='taskStatus'
					value='inProcess'
					id='radio-inProcess'
					className={ stl.radio }
					checked={ status === 'inProcess'}
					onChange={ checkingRadio }
				/>
				<label
					className={ stl.label }
					htmlFor='radio-inProcess'
				>
					в процессе
				</label>
			</div>

			<div className={ `${ stl.input } ${ stl.complete }` }>
				<input
					type="radio"
					name='taskStatus'
					value='complete'
					id='radio-complete'
					className={ stl.radio }
					checked={ status === 'complete'}
					onChange={ checkingRadio }
				/>
				<label
					className={ stl.label }
					htmlFor='radio-complete'
				>
					выполнено
				</label>
			</div>
		</div>
	)
}

export default StatusRadio