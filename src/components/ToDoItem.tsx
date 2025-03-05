import { MyTodoType, useTodos } from '../store/todos'

// Define props type explicitly
interface ToDoItemProps {
    todoItem: MyTodoType;
}

export default function ToDoItem({ todoItem }: ToDoItemProps) {

    const { toggleTodoAsCompleted, handleDelete } = useTodos();

    return (
        <li key={todoItem.id}>
            <input type="checkbox" id={`todo-${todoItem.id}`}
                checked={todoItem.completed}
                onChange={() => toggleTodoAsCompleted(todoItem.id)} />
            <label htmlFor={`todo-${todoItem.id}`} >{todoItem.task}</label>

            {

                todoItem.completed && (
                    <button onClick={() => handleDelete(todoItem.id)}>Delete</button>
                )
                
            }
        </li>
    )
}
