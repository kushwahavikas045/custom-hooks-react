
import useHttp from '../../hooks/use-https';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
 const {isLoading, error, sendRequest: sendTaskHandler} = useHttp();

 const createTask = (taskText) =>{
  const generatedId = Math.floor(Math.random() * 100); // firebase-specific => "name" contains generated id
  const createdTask = { id: generatedId, text: taskText };

  props.onAddTask(createdTask);
 }

  const enterTaskHandler = async (taskText) => {
   sendTaskHandler({
      url:'http://localhost:8000/tasks',
      method:'POST',
      headers:{  'Content-Type': 'application/json',},
      body:{text: taskText}
    },
    createTask.bind(null, taskText)
    );
  }
  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
