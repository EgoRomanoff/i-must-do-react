import stl from './TaskForm.module.scss'
import IMDTextArea from "../UI/IMDTextArea/IMDTextArea";

function TaskForm() {
	return (
		<div className={ stl.wrapper } id='task-form'>
			<IMDTextArea/>
		</div>
	);
}

export default TaskForm;