import sprite from '../../img/sprite.svg';
import stl from './Icons.module.scss'

function Icons({name, color = '#2D8D79', size = '16'}) {

	return(
		<svg
			className={`icon icon--${name}`}
			fill={color}
			width={size}
			height={size}
		>
			<use href={`${sprite}#icon--${name}`} />
		</svg>
	)
}

export default Icons;