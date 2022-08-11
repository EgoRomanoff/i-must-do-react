import stl from './FooterSkeleton.module.scss'

function FooterSkeleton() {

	return (
		<footer className={ stl.wrapper }>
			<div className={ stl.totalCounter }></div>
			<div className={ stl.taskCounter }></div>
			<div className={ stl.taskCounter }></div>
			<div className={ stl.taskCounter }></div>
		</footer>
	);
}

export default FooterSkeleton;