import stl from './IMDButton.module.scss'
import './IMDButton.scss'
import Icons from "../../Icons/Icons"

function IMDButton({ text = '', type, size, onClick }) {
	let iconSize
	switch (size) {
		case 'lg':
			iconSize = '16'
			break
		case 'sm':
			iconSize = '12'
			break
		default:
			iconSize = '16'
			break
	}

	return (
		<button
			className={`${ stl.btn } btn--${type} btn--${size}`}
			onClick={onClick}
		>
			{text}
			{
				!(type === 'cancel' || type === 'enter') &&
				<Icons
					name={ type }
					size={ iconSize }
				/>
			}
		</button>
	);
}

export default IMDButton;