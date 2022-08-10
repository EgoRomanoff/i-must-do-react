import stl from './IMDTextArea.module.scss'

function IMDTextArea() {
	return (
		<div className={ stl.wrapper }>
			<textarea
				className={ stl.input }
				type='text'
				readOnly={true}
			/>
		</div>
	);
}

export default IMDTextArea;