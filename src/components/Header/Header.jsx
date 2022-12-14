import stl from './Header.module.scss'
import logo from '../../img/logo.svg'
import IMDSearch from "../UI/IMDSearch/IMDSearch"
import IMDButton from "../UI/IMDButton/IMDButton"

function Header({ setSearchData, addTaskCallback }) {

	return (
		<div className={ stl.wrapper }>
			<svg className={ stl.logo }>
				<use href={`${ logo }#logo`}/>
			</svg>
			<IMDButton
				text="Создать"
				type="add"
				size="lg"
				onClick={ addTaskCallback }
			/>
			<IMDSearch
				setSearchData={ setSearchData }/>
		</div>
	)
}

export default Header