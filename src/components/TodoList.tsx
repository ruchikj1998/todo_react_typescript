import { useNavFilter } from '../hooks/useNavFilter';
import { MyTodoType, useTodos } from '../store/todos'
import { NAV_FILTER_ACTIVE, NAV_FILTER_COMPLETED } from '../utils/constants';
import ToDoItem from './ToDoItem';

export default function ToDoList() {

    const { todos } = useTodos();
    const navFilter = useNavFilter();

    // Extracted filtering logic
    const getFilteredTodos = () => {

        switch (navFilter) {

            case NAV_FILTER_ACTIVE:
                return todos.filter((task) => !task.completed);
            case NAV_FILTER_COMPLETED:
                return todos.filter((task) => task.completed);
            default:
                return todos;

        }

    };

    const filteredTodos = getFilteredTodos();

    return (
        <ul className='main-task'>
            {

                filteredTodos.map((todo: MyTodoType) => {
                    return <ToDoItem key={todo.id} todoItem={todo} />
                })
                
            }
        </ul>
    )
}
