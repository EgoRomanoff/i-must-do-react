import stl from './TaskForm.module.scss'
import IMDTextArea from "../UI/IMDTextArea/IMDTextArea"
import StatusRadio from "../StatusRadio/StatusRadio";

function TaskForm({ task }) {
	return (
		<form className={ stl.wrapper } id='task-form'>
			<IMDTextArea/>
			<div className={ stl.statusWrapper }>
				<StatusRadio status='waiting'/>
				{/*<StatusRadio status='inProcess'/>*/}
				{/*<StatusRadio status='complete'/>*/}
			</div>
		</form>
	);
}

export default TaskForm