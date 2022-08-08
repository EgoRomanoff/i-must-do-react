import stl from './App.module.scss'
import Tasks from "./components/Tasks/Tasks";

function App() {

  return (
    <div className={ stl.wrapper }>
      <Tasks />
    </div>
  );
}

export default App;
