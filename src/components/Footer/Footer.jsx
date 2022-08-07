import stl from './Footer.module.scss'

function Footer({total, waiting, inProcess, complete}) {

	return (
		<footer className={ stl.wrapper }>
			<span className={ stl.totalCounter }>Задач: {total}</span>
			<span className={ stl.waitingCounter }>{waiting}</span>
			<span className={ stl.inProcessCounter }>{inProcess}</span>
			<span className={ stl.completeCounter }>{complete}</span>
		</footer>
	);
}

export default Footer;