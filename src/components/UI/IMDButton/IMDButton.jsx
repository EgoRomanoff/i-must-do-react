import stl from './IMDButton.module.scss'
import './IMDButton.scss'
import Icons from "../../Icons/Icons"

function IMDButton({ text, type, size}) {
	return (
		<button className={`${ stl.btn } btn--${type} btn--${size}`}>
			{text}
			<Icons
				name='add'
			/>
		</button>
	);
}

export default IMDButton;