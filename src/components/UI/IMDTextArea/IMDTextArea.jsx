import stl from './IMDTextArea.module.scss'

function IMDTextArea() {
	return (
		// <div className={ stl.wrapper }>
		<div className={`${stl.wrapper} ${stl.editable}`}>
			<textarea
				className={ stl.input }
				type='text'
				// readOnly={true}
				readOnly={false}
			/>
		</div>
	);
}

export default IMDTextArea;