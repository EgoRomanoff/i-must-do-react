import stl from './IMDSearch.module.scss'
import Icons from '../../Icons/Icons'
import logo from '../../../img/logo.svg'

function IMDSearch() {
	return (
		<div className={`${stl.wrapper}`}>
			<input className={ stl.input } type="text" placeholder="Найти задачу..."/>
			<button className={ stl.btn }>
				<Icons
					name='search'
				/>
			</button>
		</div>
	);
}

export default IMDSearch;