import { createContext, ReactNode, useContext, useState } from "react";

export type TodosProviderProps = {
    children: ReactNode
}

export type MyTodoType = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

export type TodosContext = {
    todos: MyTodoType[];
    handleAddToDo: (tas: string) => void; // Call Signature
    toggleTodoAsCompleted: (id: string) => void;
    handleDelete: (id: string) => void;
}

export const todosContext = createContext<TodosContext | null>(null);

export const TodosProvider = ({ children }: TodosProviderProps) => {

    const [todos, setTodos] = useState<MyTodoType[]>(() => {
        try {
            const todoLocalData = localStorage.getItem("todos") || "[]";
            return JSON.parse(todoLocalData) as MyTodoType[];
        } catch (error) {
            return []
        }
    })

    const handleAddToDo = (task: string) => {
        setTodos((prev) => {
            const newTodos: MyTodoType[] = [
                {
                    id: Math.random().toString(),
                    task: task,
                    completed: false,
                    createdAt: new Date()
                },
                ...prev
            ]
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        })
    }

    const toggleTodoAsCompleted = (id: string) => {
        setTodos((prev) => {
            let newTodos = prev.map((todo) => {
                if (todo.id == id) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            })
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        })
    }

    const handleDelete = (id: string) => {
        setTodos((prev) => {
            let newTodos = prev.filter((todo) => todo.id != id)
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        })
    }

    return <todosContext.Provider value={{ todos, handleAddToDo, toggleTodoAsCompleted, handleDelete }}>
        {children}
    </todosContext.Provider>
}


//consumer
export const useTodos = () => {
    const todosConsumer = useContext(todosContext);
    if (!todosConsumer) {
        throw new Error("useTodos used outside the provider.")
    }
    return todosConsumer;
}