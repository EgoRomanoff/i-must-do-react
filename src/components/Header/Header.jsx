import stl from './Header.module.scss'
import logo from '../../img/logo.svg'
import IMDSearch from "../UI/IMDSearch/IMDSearch"
import IMDButton from "../UI/IMDButton/IMDButton"

function Header() {
	return (
		<div className={ stl.wrapper }>
			<svg className={ stl.logo }>
				<use href={`${ logo }#logo`}/>
			</svg>
			<IMDButton
				text="Создать"
				type="add"
				size="lg"
			/>
			<IMDSearch/>
		</div>
	);
}

export default Header;