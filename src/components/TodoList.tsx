import { MyTodoType, useTodos } from '../store/todos'
import { useSearchParams } from 'react-router-dom';

export default function TodoList() {

    const {todos, toggleTodoAsCompleted, handleDelete} = useTodos();
    const [searchParam] = useSearchParams();

    let filterData = todos;
    let navFilter = searchParam.get("todos");
    
    if(navFilter === "active"){
        filterData = filterData.filter((task)=> task.completed == false)
    }

    if(navFilter === "completed"){
        filterData = filterData.filter((task)=> task.completed == true)
    }

  return (
    <ul className='main-task'>
        {
            filterData.map((todo:MyTodoType) => {
                return <li key={todo.id}>
                    <input type="checkbox"  id={`todo-${todo.id}`} 
                    checked={todo.completed} 
                    onChange={() => toggleTodoAsCompleted(todo.id)}/>
                    <label htmlFor={`todo-${todo.id}`} >{todo.task}</label>

                    {
                        todo.completed && (
                            <button onClick={() => handleDelete(todo.id)}>Delete</button>
                        )
                    }
                </li>
            }) 
        }
    </ul>
  )
}
